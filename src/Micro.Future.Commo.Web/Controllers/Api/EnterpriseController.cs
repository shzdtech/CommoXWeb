using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Exceptions;
using Micro.Future.Commo.Web.Models;
using Micro.Future.Commo.Web.Models.EnterpriseModels;
using Micro.Future.Commo.Web.Services;
using Micro.Future.Commo.Web.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Enterprise")]
    public class EnterpriseController : Controller
    {
        public const int CODESEND_TIMEOUT = 5000;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private IOptions<CommoSettings> _commoSettingsAccessor;

        private readonly IEnterpriseManager _enterpriseManager;

        public EnterpriseController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IEnterpriseManager enterpriseManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            IOptions<CommoSettings> commoSettingsAccessor,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _enterpriseManager = enterpriseManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _commoSettingsAccessor = commoSettingsAccessor;
            _logger = loggerFactory.CreateLogger<EnterpriseController>();
        }

        [HttpPost]
        [Route("")]
        public async Task<EnterpriseInfo> Register(EnterpriseRegisterModel model)
        {
            if (ModelState.IsValid)
            {
                if (!_enterpriseManager.CheckEmailVerifyCode(model.EmailAddress, model.VerificationCode))
                {
                    throw new BadRequestException("验证码不正确");
                }

                var user = new ApplicationUser
                {
                    UserName = model.EmailAddress,
                    PhoneNumber = model.MobilePhone,
                    Email = model.EmailAddress,
                    //EnterpriseId = bizResult.Result,
                    InitialPassword = model.Password
                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    string roleName = "Administrator";
                    var isRoleExists = await _roleManager.RoleExistsAsync(roleName);
                    if (!isRoleExists)
                    {
                        await _roleManager.CreateAsync(new IdentityRole() { Name = roleName });
                    }

                    await _userManager.AddToRoleAsync(user, roleName);

                    await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(3, "User created a new account with password.");

                    EnterpriseInfo enterpriseInfo = new EnterpriseInfo();
                    enterpriseInfo.Name = model.Name;
                    enterpriseInfo.Contacts = model.Contacts;
                    enterpriseInfo.EmailAddress = model.EmailAddress;
                    enterpriseInfo.MobilePhone = model.MobilePhone;
                    enterpriseInfo.Address = model.Address;
                    enterpriseInfo.EnterpriseState = EnterpriseStateType.UNSUBMITED;
                    enterpriseInfo.CreateTime = DateTime.Now;

                    var bizResult = _enterpriseManager.AddEnterprise(enterpriseInfo);
                    if (!bizResult.HasError && bizResult.Data > 0)
                    {
                        ApplicationUser userInfo = await _userManager.FindByEmailAsync(user.Email);
                        userInfo.EnterpriseId = bizResult.Data;
                        await _userManager.UpdateAsync(userInfo);

                    }
                    else
                    {
                        throw new BadRequestException(bizResult.Error.Message);
                    }

                    return enterpriseInfo;
                }
                else
                {
                    string message = "企业管理员创建失败";
                    if (result.Errors.Any(e => e.Code == "PasswordTooShort" ||
                                           e.Code == "PasswordRequiresNonAlphanumeric" ||
                                           e.Code == "PasswordRequiresLower" ||
                                           e.Code == "PasswordRequiresUpper"))
                    {
                        message = "密码复杂度不足， 密码长度不少于8位，并且包含数字，大小字母写或符号";
                    }
                    else if (result.Errors.Any(e => e.Code == "DuplicateUserName"))
                    {
                        message = string.Format("邮箱{0}已注册", model.EmailAddress);
                    }

                    throw new BadRequestException(message);
                }
            }

            var allErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToArray();
            throw new BadRequestException(string.Join("\r\n", allErrors));
        }

        [HttpPost]
        [Route("{id:int}")]
        [Authorize()]
        public async Task UpdateEnterprise(int id, EnterpriseUpdateModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user.EnterpriseId != id)
                {
                    throw new ArgumentException("Not Allowed");
                }


                EnterpriseInfo enterpriseInfo = _enterpriseManager.QueryEnterpriseInfo(user.EnterpriseId);

                var businessLicenseFile = HttpContext.Request.Form.Files["businessLicense"];
                if (businessLicenseFile != null)
                { 
                    enterpriseInfo.LicenseImagePath = _SaveFile(businessLicenseFile);
                }

                var invoiceMaterialFile = HttpContext.Request.Form.Files["businessLicense"];
                if (invoiceMaterialFile != null)
                {
                    enterpriseInfo.InvoiceMaterial = _SaveFile(invoiceMaterialFile);
                }

                enterpriseInfo.AnnualInspection = model.AnnualInspection;
                enterpriseInfo.BusinessRange = model.BusinessRange;
                enterpriseInfo.BusinessTypeId = model.BusinessTypeId;
                enterpriseInfo.InvoicedQuantity = model.InvoicedQuantity;
                enterpriseInfo.LegalRepresentative = model.LegalRepresentative;
                enterpriseInfo.LicenseImagePath = model.LicenseImagePath;
                enterpriseInfo.PaymentMethodId = model.PaymentMethodId;
                enterpriseInfo.RegisterWarehouse = model.RegisterWarehouse;
                enterpriseInfo.MaxTradeAmountPerMonth = model.MaxTradeAmountPerMonth;
                if (model.IsAcceptanceBillETicket.HasValue) {
                    enterpriseInfo.IsAcceptanceBillETicket = model.IsAcceptanceBillETicket.HasValue;
                }
                if (model.PreviousProfit.HasValue)
                {
                    enterpriseInfo.PreviousProfit = model.PreviousProfit.Value;
                };
                if (model.PreviousSales.HasValue)
                {
                    enterpriseInfo.PreviousSales = model.PreviousSales.Value;
                };
                enterpriseInfo.RegisterAccount = model.RegisterAccount;
                enterpriseInfo.RegisterAddress = model.RegisterAddress;
                enterpriseInfo.RegisterBankId = model.RegisterBankId;
                enterpriseInfo.RegisterCapital = model.RegisterCapital;
                enterpriseInfo.RegisterNumber = model.RegisterNumber;
                enterpriseInfo.RegisterTime = model.RegisterTime;
                enterpriseInfo.ReputationGrade = model.ReputationGrade;
                enterpriseInfo.EnterpriseState = EnterpriseStateType.UNAPPROVED;
                _enterpriseManager.UpdateEnterprise(enterpriseInfo);
            }
            else
            {
                var allErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToArray();
                throw new BadRequestException(string.Join("\r\n", allErrors));
            }
        }

        [HttpGet]
        [Route("Email/VerifyCode")]
        public void VerifyCode(string phoneOrEmail)
        {
            try
            {
                if (_enterpriseManager.EmailHasBeenRegistered(phoneOrEmail))
                {
                    throw new BadRequestException("此邮箱已注册");
                }

                bool isEmail = phoneOrEmail.Contains("@");
                if (isEmail)
                {
                    if (_enterpriseManager.HasExceedLimitationPerDay(phoneOrEmail))
                    {
                        throw new BadRequestException("验证码发送超过当日限制");
                    }
                    else if (_enterpriseManager.CanResend(phoneOrEmail))
                    {
                        var sendTask = _emailSender.SendSingleEmailAsync(phoneOrEmail, "注册邮件", MailTemplate.Register);
                        if (sendTask.Wait(CODESEND_TIMEOUT))
                        {
                            _enterpriseManager.SaveEmailVerifyCode(sendTask.Result.RequestId, phoneOrEmail, sendTask.Result.VerifyCode, sendTask.Result.SendTime);
                        }
                    }
                }
                else
                {
                    //if (_smsVerifyCodeDbCtx.HasExceedLimitationPerDay(phoneOrEmail))
                    //{
                    //    ret = SenderStatusCode.ExceedLimitation;
                    //}
                    //else if (_smsVerifyCodeDbCtx.CanResend(phoneOrEmail))
                    //{
                    //    _logger.LogInformation("Send SMS to " + phoneOrEmail);
                    //    var sendTask = _smsSender.SendSmsAsync(phoneOrEmail, "");
                    //    if (sendTask.Wait(CODESEND_TIMEOUT))
                    //    {
                    //        _smsVerifyCodeDbCtx.SaveSMSVerifyCode(sendTask.Result.Task_Id, phoneOrEmail, sendTask.Result.Verify_Code, sendTask.Result.Send_Time);
                    //        ret = SenderStatusCode.OK;
                    //    }
                    //}
                }
            }
            catch (BadRequestException ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new BadRequestException("验证码发送失败");
            }
        }

        [HttpGet]
        [Route("Unauthed")]
        [Authorize(Roles = "Admin")]
        public IEnumerable<EnterpriseInfo> Get()
        {
            var result = _enterpriseManager.QueryEnterprises(null, EnterpriseStateType.UNAPPROVED);
            if (result.HasError)
            {
                throw new BadRequestException(result.Error.Message);
            }

            return result.Data;
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "Admin")]
        public IEnumerable<EnterpriseInfo> GetAll()
        {
            var result = _enterpriseManager.QueryEnterprises(null, EnterpriseStateType.APPROVED);
            if (result.HasError)
            {
                throw new BadRequestException(result.Error.Message);
            }

            return result.Data;
        }

        [HttpPost]
        [Route("{id:int}/State/{state:int}")]
        [Authorize(Roles = "Admin")]
        public void AuthenticateEnterprise(int id, EnterpriseStateType state)
        {
            _enterpriseManager.UpdateEnterpriseState(id, state);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<EnterpriseInfo> GetEnterpriseId(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user.EnterpriseId != id)
            {
                throw new ForbiddenException("您没有权限获取该企业信息");
            }
            return _enterpriseManager.QueryEnterpriseInfo(id);
        }


        private string _SaveFile(IFormFile file)
        {
            var filePath = @"wwwroot/" +  _commoSettingsAccessor.Value.ImageFolder;
            var fileName = Path.GetFileNameWithoutExtension(file.FileName) + "_" + Guid.NewGuid() + Path.GetExtension(file.FileName);

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            var fullPath = Path.Combine(filePath, fileName);
            using (var stream = System.IO.File.Create(fullPath))
            {
                file.OpenReadStream().CopyTo(stream);
            }

            return @"/" + _commoSettingsAccessor.Value.ImageFolder + @"/" + fileName;
        }
    }
}
