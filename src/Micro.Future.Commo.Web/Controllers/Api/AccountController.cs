using Micro.Future.Commo.Web.Models;
using Micro.Future.Commo.Web.Models.AccountModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Micro.Future.Commo.Web.Services;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Micro.Future.Commo.Web.Exceptions;
using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Web.Utilities;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Account")]
    public class AccountController : Controller
    {
        public const int CODESEND_TIMEOUT = 5000;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEnterpriseManager _enterpriseManager;
       

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            IEnterpriseManager enterpriseManager,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _enterpriseManager = enterpriseManager;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        // POST: /Account/Login
        [Route("Login")]
        [HttpPost]
        public async Task<UserInfo> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, true, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    var roles = await _userManager.GetRolesAsync(user);
                    var userInfo = new UserInfo(user, roles.ToList());
                    if (userInfo.EnterpriseId > 0)
                    {
                        var enterprise = _enterpriseManager.QueryEnterpriseInfo(user.EnterpriseId);
                        userInfo.EnterpriseAuthenticated = enterprise.EnterpriseState == Business.Abstraction.BizObject.EnterpriseStateType.APPROVED;
                        userInfo.EnterpriseName = enterprise.Name;
                    }
                    return userInfo;
                }
            }
            throw new BadRequestException("用户名或密码不正确");
        }

        [Route("User")]
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task CreateUser(CreateUserModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);

                var createdUser = new ApplicationUser { UserName = model.UserName, Email = model.Email, EnterpriseId = user.EnterpriseId, InitialPassword = model.Password };

                var result = await _userManager.CreateAsync(createdUser, model.Password);
                if (result.Succeeded)
                {
                    string roleName = "User";
                    var isRoleExists = await _roleManager.RoleExistsAsync(roleName);
                    if (!isRoleExists)
                    {
                        await _roleManager.CreateAsync(new IdentityRole() { Name = roleName });
                    }
                }
                else
                {
                    string message = "用户创建失败";
                    if (result.Errors.Any(e => e.Code == "PasswordTooShort" ||
                                           e.Code == "PasswordRequiresNonAlphanumeric" ||
                                           e.Code == "PasswordRequiresLower" ||
                                           e.Code == "PasswordRequiresUpper"))
                    {
                        message = "密码复杂度不足， 密码长度不少于8位，并且包含数字，大小字母写或符号";
                    }
                    else if (result.Errors.Any(e => e.Code == "DuplicateUserName"))
                    {
                        message = string.Format("邮箱{0}已注册", model.Email);
                    }

                    throw new BadRequestException(message);
                }
            }
            else
            {
                throw new BadRequestException("请使用正确邮箱格式");
            }

        }

        [Route("Password")]
        [HttpPost]
        public async Task ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);
                var isMatch = await _userManager.CheckPasswordAsync(user, model.Password);
                if (isMatch)
                {
                    await _userManager.RemovePasswordAsync(user);
                    var result = await _userManager.AddPasswordAsync(user, model.NewPassword);
                    if (!result.Succeeded)
                    {
                        await _userManager.AddPasswordAsync(user, model.Password);
                        throw new BadRequestException("密码复杂度不符合规范");
                    }
                }
                else
                {
                    throw new BadRequestException("密码不正确");
                }
            }
            else
            {
                throw new BadRequestException("输入格式不正确");
            }
        }

        [Route("ResetPassword")]
        [HttpPost]
        public async Task ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                if (!_enterpriseManager.CheckEmailVerifyCode(model.Email, model.VerificationCode))
                {
                    throw new BadRequestException("验证码不正确");
                }

                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    throw new BadRequestException("用户不存在");
                }
                await _userManager.RemovePasswordAsync(user);
                var result = await _userManager.AddPasswordAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    throw new BadRequestException("密码复杂度不符合规范");
                }
            }
            else
            {
                throw new BadRequestException("输入格式不正确");
            }
        }

        [HttpGet]
        [Route("Email/VerifyCode")]
        public void VerifyCode(string phoneOrEmail)
        {
            try
            {
                bool isEmail = phoneOrEmail.Contains("@");
                if (isEmail)
                {
                    if (_enterpriseManager.HasExceedLimitationPerDay(phoneOrEmail))
                    {
                        throw new BadRequestException("验证码发送超过当日限制");
                    }
                    else if (_enterpriseManager.CanResend(phoneOrEmail))
                    {
                        var sendTask = _emailSender.SendSingleEmailAsync(phoneOrEmail, "重置密码", MailTemplate.ForgotPassword);
                        if (sendTask.Wait(CODESEND_TIMEOUT))
                        {
                            _enterpriseManager.SaveEmailVerifyCode(sendTask.Result.RequestId, phoneOrEmail, sendTask.Result.VerifyCode, sendTask.Result.SendTime);
                        }
                    }
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


        [Route("SignOut")]
        [HttpPost]
        public async Task SignOut()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
