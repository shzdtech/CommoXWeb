using Micro.Future.Commo.Business.Abstraction.BizObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.RequirementModels
{
    public class RequirementSearchModel
    {
        public string ProductName { get; set; }

        /// <summary>
        /// 空=全部;1=出资;2=出货;3=补贴;
        /// </summary>
        public RequirementType RequirementType { get; set; }

        /// <summary>
        /// 空=全部;0=OPEN;1=LOCKED;2=CONFIRMED;
        /// </summary>
        public RequirementState RequirementState { get; set; }

        public string ProductType { get; set; }

        public decimal StartTradeAmount { get; set; }

        public decimal EndTradeAmount { get; set; }

        public int PageNo { get; set; }

        public int PageSize { get; set; }
    }
}
