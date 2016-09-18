using Micro.Future.Commo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    public class BaseController : Controller
    {
        public string UserId
        {
            get
            {
                if (User.Identity != null)
                {
                    return _userManager.GetUserId(User);
                }
                else
                {
                    return null;
                }
            }
        }
        private UserManager<ApplicationUser> _userManager;

        public BaseController(
            UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        protected async Task<ApplicationUser> _GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            return user;
        }
    }
}
