using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers
{
    [Route("", Order = -1)]
    [Route("{*pathInfo}", Order = 1000)]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}
