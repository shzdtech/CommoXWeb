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
        private IRequirementManager _requirementManager;
        public RequirementController(IRequirementManager requirementManager)
        {
            _requirementManager = requirementManager;
        }
        [Route("")]
        [HttpPost]
        public void AddRequirement(Models.RequirementInfo requirement)
        {
            var requirementInfo = new RequirementInfo
            {
                UserId = 1,
                EnterpriseId = new Random().Next(100),
                CreateTime = DateTime.UtcNow,
                ModifyTime = DateTime.UtcNow,
                ProductName = requirement.ProductName,
                ProductPrice = requirement.ProductPrice,
                ProductQuantity = requirement.ProductQuantity,
                ProductSpecification = requirement.ProductSpecification,
                ProductType = requirement.ProductType,
                ProductUnit = requirement.ProductUnit,
                TradeAmount = requirement.TradeAmount,
                Type = requirement.Type,
                Subsidies = requirement.Subsidies,
                WarehouseState = requirement.WarehouseState,
                WarehouseCity = requirement.WarehouseCity,
                WarehouseAddress1 = requirement.WarehouseAddress1,
                WarehouseAddress2 = requirement.WarehouseAddress2,
                Rules = requirement.Rules
            };

            _requirementManager.AddRequirementInfo(requirementInfo);
        }

        [Route("")]
        [HttpGet]
        public IEnumerable<Models.RequirementInfo> GetRequirements()
        {
            var userId = 1;
            return _requirementManager.QueryRequirements(userId).Result.Select(r => new Models.RequirementInfo(r));
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
