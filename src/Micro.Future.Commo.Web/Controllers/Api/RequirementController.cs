using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Models.RequirementModels;
using Micro.Future.Commo.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{

    [Produces("application/json")]
    [Route("api/Requirement")]
    [Authorize]
    public class RequirementController : BaseController
    {
        private IRequirementManager _requirementManager;
        private IChainManager _chainManager;
        private UserManager<Models.ApplicationUser> _userManager;
        public RequirementController(UserManager<Models.ApplicationUser> userManager, IRequirementManager requirementManager, IChainManager chainManager)
            :base(userManager)
        {
            _requirementManager = requirementManager;
            _chainManager = chainManager;
            _userManager = userManager;
        }
        [Route("")]
        [HttpPost]
        public async Task<Models.RequirementInfo> AddRequirement(Models.RequirementInfo requirement)
        {
            var user = await _userManager.GetUserAsync(User);
            var requirementInfo = new RequirementInfo
            {
                UserId = UserId,
                RequirementId = requirement.RequirementId,
                EnterpriseId = user.EnterpriseId,
                PaymentType = requirement.PaymentType,
                PaymentDateTime = requirement.PaymentDateTime,
                PaymentAmount = requirement.PaymentAmount,
                ProductName = requirement.ProductName,
                WarehouseAccount = requirement.WarehouseAccount,
                ProductPrice = requirement.ProductPrice,
                ProductQuantity = requirement.ProductQuantity,
                ProductSpecification = requirement.ProductSpecification,
                ProductType = requirement.ProductType,
                ProductUnit = requirement.ProductUnit,
                TradeAmount = requirement.TradeAmount,
                Type = requirement.Type,
                InvoiceValue = requirement.InvoiceValue,
                InvoiceIssueDateTime = requirement.InvoiceIssueDateTime,
                InvoiceTransferMode = requirement.InvoiceTransferMode,
                TradeProfit = requirement.TradeProfit,
                BusinessRange = requirement.BusinessRange,
                Subsidies = requirement.Subsidies,
                WarehouseState = requirement.WarehouseState,
                WarehouseCity = requirement.WarehouseCity,
                WarehouseAddress1 = requirement.WarehouseAddress1,
                WarehouseAddress2 = requirement.WarehouseAddress2,
                Rules = requirement.Rules
            };

            var result = _requirementManager.AddRequirementInfo(requirementInfo).Result;

            requirement.RequirementId = result.RequirementId;
            return requirement;
        }

        [Route("")]
        [HttpGet]
        public async Task<IEnumerable<Models.RequirementInfo>> GetRequirements()
        {
            var user = await _userManager.GetUserAsync(User);
            //return _requirementManager.QueryRequirements(UserId).Result.Select(r => new Models.RequirementInfo(r));
            return _requirementManager.QueryRequirementsByEnterpriseId(user.EnterpriseId, null).Result.Select(r => new Models.RequirementInfo(r));
        }

        [Route("{id:int}")]
        [HttpGet]
        public Models.RequirementInfo GetRequirement(int id)
        {
            return new Models.RequirementInfo(_requirementManager.QueryRequirementInfo(id).Result);
        }

        [Route("{id:int}/Chains")]
        [HttpGet]
        public IEnumerable<Models.ChainInfo> GetChains(int id)
        {
            var chains = new List<RequirementChainInfo>();
            var lockedChains = _chainManager.QueryChainsByRequirementId(id, ChainStatusType.LOCKED).Result;
            var confirmedChains = _chainManager.QueryChainsByRequirementId(id, ChainStatusType.CONFIRMED).Result;
            if (lockedChains != null)
            {
                chains.AddRange(lockedChains.ToList());
            }
            if (confirmedChains != null)
            {
                chains.AddRange(confirmedChains.ToList());
            }
            return chains.Select(c => new Models.ChainInfo(c)).ToList();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("SearchResult")]
        public IEnumerable<Models.RequirementInfo> SearchRequirements(RequirementSearchModel searchCriteria)
        {
            var criteria = new RequirementSearchCriteria();
            if (!string.IsNullOrWhiteSpace(searchCriteria.ProductName))
                criteria.ProductName = searchCriteria.ProductName;
            if (!string.IsNullOrWhiteSpace(searchCriteria.ProductType))
                criteria.ProductType = searchCriteria.ProductType;
            if (searchCriteria.RequirementType != RequirementType.None)
            {
                criteria.RequirementType = searchCriteria.RequirementType;
            }

            if (searchCriteria.StartTradeAmount > 0m)
                criteria.StartTradeAmount = searchCriteria.StartTradeAmount;

            if (searchCriteria.EndTradeAmount > 0m)
                criteria.EndTradeAmount = searchCriteria.EndTradeAmount;

            criteria.PageNo = searchCriteria.PageNo;
            criteria.PageSize = searchCriteria.PageSize;

            var searchResult = _requirementManager.SearchRequirements(criteria);
            var requirements = new List<Models.RequirementInfo>();
            if (searchResult.Result != null)
            {
                requirements.AddRange(searchResult.Result.Select(r => new Models.RequirementInfo(r)));
            }

            return requirements;

            //var user = await _userManager.GetUserAsync(User);
            ////return _requirementManager.QueryRequirements(UserId).Result.Select(r => new Models.RequirementInfo(r));
            //return _requirementManager.QueryRequirementsByEnterpriseId(user.EnterpriseId, null).Result.Select(r => new Models.RequirementInfo(r));
        }
    }
}
