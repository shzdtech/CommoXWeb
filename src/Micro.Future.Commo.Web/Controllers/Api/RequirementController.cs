using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{

    [Produces("application/json")]
    [Route("api/Requirement")]
    public class RequirementController : Controller
    {
        private string _userId = "1";
        private IRequirementManager _requirementManager;
        public RequirementController(IRequirementManager requirementManager)
        {
            _requirementManager = requirementManager;
        }
        [Route("")]
        [HttpPost]
        public Models.RequirementInfo AddRequirement(Models.RequirementInfo requirement)
        {
            var requirementInfo = new RequirementInfo
            {
                UserId = _userId,
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
            return _requirementManager.QueryRequirements(_userId).Result.Select(r => new Models.RequirementInfo(r));
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
            var chains = _requirementManager.QueryRequirementChains(id);
            return _requirementManager.QueryRequirementChains(id).Result.Select(c => new Models.ChainInfo(c)).ToList();
        }

    }
}
