using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Micro.Future.Commo.Web.Repository.IRepository;

namespace Micro.Future.Commo.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Test")]
    public class TestController : Controller
    {
        private IContactRepository _contactRepo;

        public TestController(IContactRepository repo)
        {
            _contactRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(/*await*/ "Helo");
        }
    }
}