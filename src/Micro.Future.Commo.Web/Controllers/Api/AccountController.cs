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

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
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
                    return new UserInfo(user, roles.ToList());
                }
            }
            throw new BadRequestException("Username or password invalid中文");
        }

        [Route("User")]
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task CreateUser(CreateUserModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);

                string initialPassword = "QAZ@wsx3";
                var createdUser = new ApplicationUser { UserName = model.Email, Email = model.Email, EnterpriseId = user.EnterpriseId, InitialPassword = initialPassword };

                var result = await _userManager.CreateAsync(createdUser, initialPassword);
                if (result.Succeeded)
                {
                    string roleName = "User";
                    var isRoleExists = await _roleManager.RoleExistsAsync(roleName);
                    if (!isRoleExists)
                    {
                        await _roleManager.CreateAsync(new IdentityRole() { Name = roleName });
                    }

                    await _userManager.AddToRoleAsync(createdUser, roleName);
                }
            }
            else
            {
                throw new BadRequestException("Invalid Email");
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

        [Route("SignOut")]
        [HttpPost]
        public async Task SignOut()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
