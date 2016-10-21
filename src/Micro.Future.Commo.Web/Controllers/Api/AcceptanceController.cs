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
    [Route("api/Acceptance")]
    public class AcceptanceContoller : BaseController
    {
        private IAcceptanceManager _acceptanceManager;
        public AcceptanceContoller(UserManager<Models.ApplicationUser> userManager, IAcceptanceManager acceptanceManager)
            : base(userManager)
        {
            _acceptanceManager = acceptanceManager;
        }

        [HttpPost]
        [Route("")]
        public void Create(AcceptanceInfo info)
        {
            _acceptanceManager.CreateAcceptance(info);
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<AcceptanceInfo> Get()
        {
            var list = _acceptanceManager.QueryAllAcceptance();
            if (list == null)
            {
                list = new List<AcceptanceInfo>();
            }

            return list;
        }
    }
}
