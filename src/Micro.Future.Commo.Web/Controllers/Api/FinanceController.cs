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
    [Route("api/Finance")]
    public class FinanceController : BaseController
    {
        private IFinancialProductManager _financialProductManager;
        public FinanceController(UserManager<Models.ApplicationUser> userManager, IFinancialProductManager financialProductManager)
            : base(userManager)
        {
            _financialProductManager = financialProductManager;
        }

        [HttpPost]
        [Route("")]
        public int Create(FinancialProductInfo info)
        {
            return _financialProductManager.CreateFinancialProduct(info);
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<FinancialProductInfo> Get()
        {
           var list =  _financialProductManager.QueryAllFinancialProducts();
            if (list == null)
            {
                list = new List<FinancialProductInfo>();
            }

            return list;
        }

        [HttpDelete]
        [Route("{id:int}")]
        public void Delete(int id)
        {
            _financialProductManager.DeleteFinancialProduct(id);
        }
    }
}
