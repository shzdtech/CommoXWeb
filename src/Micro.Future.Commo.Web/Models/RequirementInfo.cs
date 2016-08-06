using Micro.Future.Commo.Business.Abstraction.BizObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models
{
    public class RequirementInfo
    {
        /// <summary>
        /// 需求ID
        /// </summary>
        public int RequirementId { get; set; }

        /// <summary>
        /// 需求类型：买/卖/补贴
        /// </summary>
        public RequirementType Type { get; set; }

        #region 货物相关属性，出资、出货需要填写

        /// <summary>
        /// 货物名称，
        /// </summary>
        public string ProductName { get; set; }


        /// <summary>
        /// 货物类型：有色、化工等
        /// </summary>
        public string ProductType { get; set; }

        /// <summary>
        /// 货物规格：Cu_Ag>=99.95%
        /// </summary>
        public string ProductSpecification { get; set; }

        /// <summary>
        /// 货物单价：
        /// </summary>
        public decimal ProductPrice { get; set; }

        /// <summary>
        /// 货物数量
        /// </summary>
        public decimal ProductQuantity { get; set; }

        /// <summary>
        /// 获取单位， 吨
        /// </summary>
        public string ProductUnit { get; set; }

        #region 仓储信息

        /// <summary>
        /// 仓库省份/区 如：上海、北京、浙江、江苏
        /// </summary>
        public string WarehouseState { get; set; }

        /// <summary>
        /// 仓库 城市，如：上海、北京、杭州、无锡
        /// </summary>
        public string WarehouseCity { get; set; }

        /// <summary>
        /// 详细地址1
        /// </summary>
        public string WarehouseAddress1 { get; set; }

        /// <summary>
        /// 详细地址2
        /// </summary>
        public string WarehouseAddress2 { get; set; }

        #endregion

        #endregion

        #region 出货类型需求需要的属性





        #endregion

        #region 出资类型需求需要的属性




        #endregion

        /// <summary>
        /// 出资和补贴两种需求都使用这个字段.
        /// 
        /// 出资方：出资总金额，我要购买xxx货物xxx吨，出资1亿
        /// 补贴方：贸易量，我要多少贸易量（1个亿的贸易量）
        /// </summary>
        public decimal TradeAmount { get; set; }

        #region 补贴


        /// <summary>
        /// 补贴额度，比如：我要1个亿的贸易量，我补贴贸易量的5%
        /// </summary>
        public decimal Subsidies { get; set; }

        #endregion

        /// <summary>
        /// 需求的撮合规则
        /// </summary>
        public IEnumerable<RequirementRuleInfo> Rules { get; set; }

        public RequirementInfo(Business.Abstraction.BizObject.RequirementInfo requirement)
        {
            RequirementId = requirement.RequirementId;
            ProductName = requirement.ProductName;
            ProductPrice = requirement.ProductPrice;
            ProductQuantity = requirement.ProductQuantity;
            ProductSpecification = requirement.ProductSpecification;
            ProductType = requirement.ProductType;
            ProductUnit = requirement.ProductUnit;
            TradeAmount = requirement.TradeAmount;
            Type = requirement.Type;
            Subsidies = requirement.Subsidies;
            WarehouseState = requirement.WarehouseState;
            WarehouseCity = requirement.WarehouseCity;
            WarehouseAddress1 = requirement.WarehouseAddress1;
            WarehouseAddress2 = requirement.WarehouseAddress2;
            Rules = requirement.Rules;
        }
    }
}
