﻿using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Services;
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
    public class RequirementController : BaseController
    {
        private IRequirementManager _requirementManager;
        private IChainManager _chainManager;
        public RequirementController(UserManager<Models.ApplicationUser> userManager, IRequirementManager requirementManager, IChainManager chainManager)
            :base(userManager)
        {
            _requirementManager = requirementManager;
            _chainManager = chainManager;
        }
        [Route("")]
        [HttpPost]
        public Models.RequirementInfo AddRequirement(Models.RequirementInfo requirement)
        {
            var requirementInfo = new RequirementInfo
            {
                UserId = UserId,
                RequirementId = requirement.RequirementId,
                EnterpriseId = requirement.EnterpriseId,
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
        public IEnumerable<Models.RequirementInfo> GetRequirements()
        {

            return _requirementManager.QueryRequirements(UserId).Result.Select(r => new Models.RequirementInfo(r));
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
            var lockedChains = _chainManager.QueryChainsByRequirementId(id, ChainStatusType.LOCKED);
            var confirmedChains = _chainManager.QueryChainsByRequirementId(id, ChainStatusType.CONFIRMED);
            if (lockedChains != null)
            {
                chains.AddRange(lockedChains.ToList());
            }
            if (confirmedChains != null)
            {
                chains.AddRange(confirmedChains.ToList());
            }
            return _requirementManager.QueryRequirementChains(id).Result.Select(c => new Models.ChainInfo(c)).ToList();
        }

    }
}
