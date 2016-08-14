﻿using Micro.Future.Commo.Business.Abstraction.BizInterface;
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
        private IChainManager _chainManager;

        public ChainController(IRequirementManager requirementManager, IChainManager chainManager)
        {
            _requirementManager = requirementManager;
            _chainManager = chainManager;
        }

        [HttpPost]
        [Route("{id:int}/Confirmation/{requirementId:int}")]
        public int ConfirmChain(int id, int requirementId)
        {
            int tradeId;
            _chainManager.ConfirmRequirement(id, requirementId, out tradeId);
            return tradeId;
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<Models.ChainInfo> Get()
        {
            var userId = 1;
            return _chainManager.QueryChains(1).Select(c => new Models.ChainInfo(c, userId)).ToList(); ;
        }
    }
}
