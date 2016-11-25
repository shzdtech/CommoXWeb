using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Business.Abstraction.BizObject.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Authorize]
    [Route("api/Trade")]
    public class TradeController : BaseController
    {
        private ITradeManager _tradeManager;
        private UserManager<Models.ApplicationUser> _userManager;

        public TradeController(UserManager<Models.ApplicationUser> userManager,
            ITradeManager tradeManager) : base(userManager)
        {
            _tradeManager = tradeManager;
            _userManager = userManager;
        }

        [Route("State/{state:int}")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IList<TradeInfo> GetAllTrade(TradeState state)
        {
            var tradeList = _tradeManager.GetTrades(state);
            if (tradeList == null)
            {
                tradeList = new List<TradeInfo>();
            }

            return tradeList;
        }

        [HttpPost]
        [Route("{id:int}/State/{state:int}")]
        [Authorize(Roles = "Admin")]
        public void UpdateTradeState(int id, TradeState state)
        {
            _tradeManager.UpdateTradeState(id, state);
        }

        [HttpGet]
        [Route("Enterprise/State/{state:int}")]
        [Authorize]
        public async Task<IList<TradeInfo>> GetTradeByEnterprise(TradeState state)
        {
            var user = await _userManager.GetUserAsync(User);
            var tradeList = _tradeManager.QueryTradesByEnterprise(user.EnterpriseId, state);
            if (tradeList == null)
            {
                tradeList = new List<TradeInfo>();
            }

            return tradeList;
        }
    }
}
