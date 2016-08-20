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

        //[Route("/Requirement")]
        //public ActionResult Requirement()
        //{
        //    return View("Index");
        //}

        //[Route("/AddRequirement")]
        //public ActionResult AddRequirement()
        //{
        //    return View("Index");
        //}

        //[Route("/Chains")]
        //public ActionResult Chains()
        //{
        //    return View("Index");
        //}


        //[Route("/Requirement/{id:int}/Chains")]
        //public ActionResult RequirementChain()
        //{
        //    return View("Index");
        //}
    }
}
