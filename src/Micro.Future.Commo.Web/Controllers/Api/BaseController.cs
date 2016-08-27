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
                    var task = _userManager.FindByNameAsync(User.Identity.Name);
                    task.Wait();
                    return task.Result.Id;
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
    }
}
