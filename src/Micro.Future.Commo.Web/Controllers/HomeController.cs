using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [Route("/Requirement")]
        public ActionResult Requirement()
        {
            return View("Index");
        }

        [Route("/AddRequirement")]
        public ActionResult AddRequirement()
        {
            return View("Index");
        }

        [Route("/Chains")]
        public ActionResult Chains()
        {
            return View("Index");
        }
    }
}
