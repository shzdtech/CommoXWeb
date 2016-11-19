using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Micro.Future.Commo.Business.Abstraction.BizInterface;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Basis")]
    public class BasisController : Controller
    {
        private IBasisManager _basisManager;
        private Dictionary<string, string> _productExchangeMapping =  new Dictionary<string, string>()
        {
            { "CU", "SHFE"},
            { "AL", "SHFE"},
            { "ZN", "SHFE"},
            { "I", "DCE"},
            { "JM", "DCE"}
        };
        public BasisController(IBasisManager basisManager)
        {
            _basisManager = basisManager;
        }

        public string GetBasisByProduct(string productCode)
        {
            return _basisManager.QueryBasisInfos(_productExchangeMapping[productCode], productCode,
                DateTime.Now.AddDays(-8).ToString("yyyy-MM-dd hh:mm:ss"),
                DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss"));
        }
    }
}
