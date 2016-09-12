using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Exceptions;
using Micro.Future.Commo.Web.Models;
using Micro.Future.Commo.Web.Models.EnterpriseModels;
using Micro.Future.Commo.Web.Services;
using Micro.Future.Commo.Web.Utilities;
using Microsoft.AspNetCore.Authorization;
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
                EnterpriseInfo enterpriseInfo = new EnterpriseInfo();
                enterpriseInfo.Name = model.Name;
                enterpriseInfo.Contacts = model.Contacts;
                enterpriseInfo.EmailAddress = model.EmailAddress;
                enterpriseInfo.MobilePhone = model.MobilePhone;
                enterpriseInfo.Address = model.Address;
                enterpriseInfo.EnterpriseState = EnterpriseStateType.UNAPPROVED;
                enterpriseInfo.CreateTime = DateTime.Now;

                var bizResult = _enterpriseManager.AddEnterprise(enterpriseInfo);
                if (!bizResult.HasError && bizResult.Result > 0)
                {
                    string initialPassword = "QAZ@wsx3";
                    var user = new ApplicationUser
                    {
                        UserName = model.EmailAddress,
                        PhoneNumber = model.MobilePhone,
                        Email = model.EmailAddress,
                        EnterpriseId = bizResult.Result,
                        InitialPassword = initialPassword
                    };

                    var result = await _userManager.CreateAsync(user, initialPassword);
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
                        return enterpriseInfo;
                    }
                    else
                    {
                        var error = result.Errors.FirstOrDefault();
                        if (error?.Code == "DuplicateUserName")
                        {
                            throw new BadRequestException(string.Format("邮箱{0}已注册", model.EmailAddress));
                        }
                    }
                }
                else
                {
                    throw new BadRequestException(bizResult.Error.Message);
                }
            }
            throw new BadRequestException("企业注册失败, 请检查输入是否正确");
        }

        [HttpPost]
        [Route("{id:int}")]
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

                var imageFile = HttpContext.Request.Form.Files["businessLicense"];
                if (imageFile != null)
                {
                    var filePath = _commoSettingsAccessor.Value.ImageFolder;
                    var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);

                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    var fullPath = Path.Combine(filePath, fileName);
                    using (var stream = System.IO.File.Create(fullPath))
                    {
                        imageFile.OpenReadStream().CopyTo(stream);
                    }

                    enterpriseInfo.LicenseImagePath = fullPath;
                }


                enterpriseInfo.AnnualInspection = model.AnnualInspection;
                enterpriseInfo.BusinessRange = model.BusinessRange;
                enterpriseInfo.BusinessTypeId = model.BusinessTypeId;
                enterpriseInfo.InvoicedQuantity = model.InvoicedQuantity;
                enterpriseInfo.LegalRepresentative = model.LegalRepresentative;
                enterpriseInfo.LicenseImagePath = model.LicenseImagePath;
                enterpriseInfo.PaymentMethodId = model.PaymentMethodId;
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
                throw new BadRequestException("输入数据不正确");
            }
        }

        [HttpGet]
        [Route("")]
        public SenderStatusCode VerifyCode(string phoneOrEmail)
        {
            SenderStatusCode ret = SenderStatusCode.Failed;
            try
            {
                if (_enterpriseManager.EmailHasBeenRegistered(phoneOrEmail))
                {
                    return SenderStatusCode.UserExist;
                }

                bool isEmail = phoneOrEmail.Contains("@");
                if (isEmail)
                {
                    if (_enterpriseManager.HasExceedLimitationPerDay(phoneOrEmail))
                    {
                        ret = SenderStatusCode.ExceedLimitation;
                    }
                    else if (_enterpriseManager.CanResend(phoneOrEmail))
                    {
                        var sendTask = _emailSender.SendSingleEmailAsync(phoneOrEmail, "注册邮件", MailTemplate.Register);
                        if (sendTask.Wait(CODESEND_TIMEOUT))
                        {
                            _enterpriseManager.SaveEmailVerifyCode(sendTask.Result.RequestId, phoneOrEmail, sendTask.Result.VerifyCode, sendTask.Result.SendTime);
                            ret = SenderStatusCode.OK;
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
            }

            return ret;
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "Admin")]
        public IEnumerable<EnterpriseInfo> Get()
        {
            var result = _enterpriseManager.QueryEnterprises(null, EnterpriseStateType.UNAPPROVED);
            if (result.HasError)
            {
                throw new BadRequestException(result.Error.Message);
            }

            return result.Result;
        }

        [HttpPost]
        [Route("{id:int}/State/{state:int}")]
        [Authorize(Roles = "Admin")]
        public void AuthenticateEnterprise(int id, EnterpriseStateType state)
        {
            _enterpriseManager.UpdateEnterpriseState(id, state);
        }
    }
}
