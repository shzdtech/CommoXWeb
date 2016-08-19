using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Micro.Future.Commo.Web.Services;
using Micro.Future.Commo.Web.Models;
using Microsoft.Extensions.Logging;
using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Web.Models.EnterpriseViewModels;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Micro.Future.Commo.Web.Controllers
{
    [Authorize(Roles = "Administrator")]
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


        //
        // GET: /Enterprise/Register
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(EnterpriseRegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                EnterpriseInfo newEnterprise = new EnterpriseInfo();
                newEnterprise.Name = model.Name;
                newEnterprise.Address = model.Address;
                newEnterprise.Contacts = model.Contacts;
                //newEnterprise.Email = model.Email;
                newEnterprise.RegisterNumber = model.RegisterNumber;
                newEnterprise.RegisterTime = model.RegisterTime;
                newEnterprise.RegisterCapital = model.RegisterCapital;
                newEnterprise.RegisterAddress = model.RegisterAddress;
                newEnterprise.BusinessTypeId = model.BusinessTypeId;
                newEnterprise.BusinessRange = model.BusinessRange;
                newEnterprise.CreateTime = DateTime.Now;

                var bizResult = _enterpriseManager.AddEnterprise(newEnterprise);
                if (!bizResult.HasError && bizResult.Result > 0)
                {
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email, EnterpriseId = bizResult.Result };
                    string initialPassword = "QAZ@wsx3";
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
                        return RedirectToLocal(returnUrl);
                    }
                }

                ModelState.AddModelError(string.Empty, "��ҵ��Ϣע��ʧ�ܣ�" + bizResult.Error.Message);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        public IActionResult EnterpriseInfo()
        {
            return View();
        }


        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }
    }
}