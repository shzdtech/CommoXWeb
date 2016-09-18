using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    public class ChainController : BaseController
    {
        private IRequirementManager _requirementManager;
        private IChainManager _chainManager;
        private IMatchMakerManager _matchMakerManger;

        public ChainController(UserManager<Models.ApplicationUser> userManager, IRequirementManager requirementManager, IChainManager chainManager, IMatchMakerManager matchMakerManger)
            :base(userManager)
        {
            _requirementManager = requirementManager;
            _chainManager = chainManager;
            _matchMakerManger = matchMakerManger;
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
            var chainList = _chainManager.QueryAllChains(statusId).Result;
            if (chainList == null)
            {
                return new List<Models.ChainInfo>();
            }

            return chainList.Select(c => new Models.ChainInfo(c)).ToList();
        }

        [HttpPost]
        [Route("{id:int}/Status/{status:int}")]
        [Authorize(Roles = "Admin")]
        public async Task ChangeChainStatus(int id, ChainStatusType status)
        {
            var user = await _GetUser();
            if (status == ChainStatusType.OPEN)
            {
                _chainManager.LockChain(user.Id, id);
            }
            else if (status == ChainStatusType.LOCKED)
            {
                int tradeId;
                _chainManager.ComfirmChain(user.Id, id, out tradeId);
            }
        }

        [HttpPost]
        [Route("{id:int}/Unlock")]
        [Authorize(Roles = "Admin")]
        public async Task UnlockChain(int id)
        {
            var user = await _GetUser();
            _chainManager.UnlockChain(user.Id, id);
        }

        [HttpPost]
        [Route("Maker")]
        [Authorize(Roles = "Admin")]
        public void MakeChain()
        {
            _matchMakerManger.Make();
        }
    }
}
