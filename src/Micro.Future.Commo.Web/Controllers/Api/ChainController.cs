using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Chain")]
    public class ChainController : Controller
    {
        private IRequirementManager _requirementManager;
        public ChainController(IRequirementManager requirementManager)
        {
            _requirementManager = requirementManager;
        }
    }
}
