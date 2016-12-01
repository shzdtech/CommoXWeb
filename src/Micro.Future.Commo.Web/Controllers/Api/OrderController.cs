using Micro.Future.Commo.Business.Abstraction.BizInterface;
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
    [Route("api/Order")]
    public class OrderController : BaseController
    {
        private ITradeManager _tradeManager;
        private UserManager<Models.ApplicationUser> _userManager;

        public OrderController(UserManager<Models.ApplicationUser> userManager,
            ITradeManager tradeManager) : base(userManager)
        {
            _tradeManager = tradeManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("{id:int}/State/{state:int}")]
        public async Task UpdateTradeState(int id, OrderStateType state)
        {
            var user = await _userManager.GetUserAsync(User);
            _tradeManager.UpdateOrderState(id, state, user.Id);
        }
    }
}
