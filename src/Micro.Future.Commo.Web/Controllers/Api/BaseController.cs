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
                return User.Identity.Name;
            }
        }
    }
}
