using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Exceptions;
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
            var requirementInfo = new RequirementInfo
            {
                UserId = UserId,
                RequirementId = requirement.RequirementId,
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
                CreateTime = DateTime.Now,
                Rules = requirement.Rules
            };

            if (requirement.EnterpriseId > 0)
            {
                requirementInfo.EnterpriseId = requirement.EnterpriseId;
                requirementInfo.OpUserId = UserId;
            }
            else
            {
                var user = await _userManager.GetUserAsync(User);
                requirementInfo.EnterpriseId = user.EnterpriseId;
            }

            
            var result = _requirementManager.AddRequirementInfo(requirementInfo);
            if (result.HasError)
            {
                throw new BadRequestException(result.Error.Message);
            }

            requirement.RequirementId = result.Result.RequirementId;
            return requirement;
        }

        [Route("")]
        [HttpGet]
        public async Task<IEnumerable<Models.RequirementInfo>> GetRequirements(RequirementSearchModel searchCriteria)
        {
            var user = await _userManager.GetUserAsync(User);
            var criteria = new RequirementSearchCriteria();
            criteria.EnterpriseId = user.EnterpriseId;
            if (searchCriteria != null)
            {
                criteria.PageNo = searchCriteria.PageNo;
                criteria.PageSize = searchCriteria.PageSize;
                criteria.OrderByFields = new List<OrderByInfo> { new OrderByInfo { Field = "CreateTime", OrderBy = "desc" } };
                if (searchCriteria.RequirementType != RequirementType.None)
                {
                    criteria.RequirementType = searchCriteria.RequirementType;
                }

                if (searchCriteria.RequirementState != null)
                {
                    criteria.RequirementState = searchCriteria.RequirementState;
                }
            }

            var searchResult = _requirementManager.SearchRequirements(criteria);
            var requirements = new List<Models.RequirementInfo>();
            if (searchResult.Result != null)
            {
                requirements.AddRange(searchResult.Result.Select(r => new Models.RequirementInfo(r)));
            }

            return requirements;
            //return _requirementManager.QueryRequirementsByEnterpriseId(user.EnterpriseId, null).Result.Select(r => new Models.RequirementInfo(r));
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
            criteria.OrderByFields = new List<OrderByInfo> { new OrderByInfo { Field = "CreateTime", OrderBy = "desc" } };
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
        }
    }
}
