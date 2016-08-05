using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Micro.Future.Commo.Web.Services;

namespace Micro.Future.Commo.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Test")]
    public class TestController : Controller
    {

        public TestController(IEmailSender emailService)
        {
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(/*await*/ "Helo");
        }
    }
}