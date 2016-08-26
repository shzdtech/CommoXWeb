using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
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

        //[HttpPost]
        //[Route("{id:int}/Confirmation/{requirementId:int}")]
        //public int ConfirmChain(int id, int requirementId)
        //{
        //    int tradeId;
        //    //_chainManager.ConfirmRequirement(id, requirementId, out tradeId);
        //    return tradeId;
        //}

        //[HttpGet]
        //[Route("")]
        //public IEnumerable<Models.ChainInfo> Get()
        //{
        //    var userId = "1";
        //    return _chainManager.QueryChains(userId).Select(c => new Models.ChainInfo(c, "1")).ToList(); ;
        //}

        [HttpGet]
        [Route("Status/{statusId:int}/Chains")]
        public IEnumerable<Models.ChainInfo> Get(ChainStatusType statusId)
        {
            var chainList = _chainManager.QueryAllChains(statusId);
            if (chainList == null)
            {
                return new List<Models.ChainInfo>();
            }

            return _chainManager.QueryAllChains(statusId).Select(c => new Models.ChainInfo(c)).ToList();
        }

        [HttpPost]
        [Route("{id:int}/Status/{status:int}")]
        public void ChangeChainStatus(int id, ChainStatusType status)
        {
            if (status == ChainStatusType.OPEN)
            {
                _chainManager.LockChain(id);
            }
            else if (status == ChainStatusType.LOCKED)
            {
                int tradeId;
                _chainManager.ComfirmChain(id, out tradeId);
            }
        }
    }
}
