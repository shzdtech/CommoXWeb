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
        private IAcceptanceBankManager _acceptanceBankManager;

        public AcceptanceContoller(UserManager<Models.ApplicationUser> userManager, IAcceptanceManager acceptanceManager,
            IAcceptanceBankManager acceptanceBankManager)
            : base(userManager)
        {
            _acceptanceManager = acceptanceManager;
            _acceptanceBankManager = acceptanceBankManager;
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = "Admin")]
        public int Create(AcceptanceInfo info)
        {
            return _acceptanceManager.CreateAcceptance(info);
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

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
            _acceptanceManager.DeleteAcceptance(id);
        }

        [HttpGet]
        [Route("Bank")]
        public IList<AcceptanceBankInfo> GetBanks()
        {
            var list = _acceptanceBankManager.QueryAllBanks();
            if (list == null)
            {
                list = new List<AcceptanceBankInfo>();
            }

            return list;
        }

        [HttpDelete]
        [Route("Bank/{id:int}")]
        [Authorize(Roles = "Admin")]
        public void DeleteBank(int id)
        {
            _acceptanceBankManager.DeleteBank(id);
        }

        [HttpPost]
        [Route("Bank")]
        [Authorize(Roles = "Admin")]
        public AcceptanceBankInfo CreateBank(AcceptanceBankInfo info)
        {
            return _acceptanceBankManager.CreateBank(info);
        }
    }
}
