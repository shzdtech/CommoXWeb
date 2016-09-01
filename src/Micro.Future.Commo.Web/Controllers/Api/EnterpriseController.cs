using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Models;
using Micro.Future.Commo.Web.Models.EnterpriseViewModels;
using Micro.Future.Commo.Web.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Enterprise")]
    public class EnterpriseController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;

        private readonly IEnterpriseManager _enterpriseManager;

        public EnterpriseController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IEnterpriseManager enterpriseManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _enterpriseManager = enterpriseManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
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
                enterpriseInfo.EnterpriseState = EnterpriseStateType.UNAPPROVED;
                enterpriseInfo.CreateTime = DateTime.Now;

                var bizResult = _enterpriseManager.AddEnterprise(enterpriseInfo);
                if (!bizResult.HasError && bizResult.Result > 0)
                {
                    string initialPassword = "QAZ@wsx3";
                    var user = new ApplicationUser
                    {
                        UserName = model.EmailAddress,
                        PhoneNumber =model.MobilePhone,
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
                }
            }

            throw new Exception();
        }
    }
}
