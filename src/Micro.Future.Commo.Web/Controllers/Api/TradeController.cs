using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
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

        [Route("Enterprise")]
        public async Task<List<TradeInfo>> GetTradeByEnterprise()
        {
            var user = await _userManager.GetUserAsync(User);
            return _tradeManager.QueryTradesByEnterprise(user.EnterpriseId, null).ToList();
        }
    }
}
