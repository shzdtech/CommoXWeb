﻿using Micro.Future.Commo.Business.Abstraction.BizObject;
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
        public int EnterpriseId { get; set; }

        /// <summary>
        /// 公司名称
        /// </summary>
        public string EnterpriseName { get; set; }
        /// <summary>
        /// 需求类型：买/卖/补贴
        /// </summary>
        public RequirementType Type { get; set; }

        /// <summary>
        /// 需求状态
        /// </summary>
        public RequirementState State { get; set; }

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

        #region 出资

        /// <summary>
        /// 资金金额
        /// </summary>
        public decimal PaymentAmount { get; set; }

        /// <summary>
        /// 货款支付时间
        /// </summary>
        public string PaymentDateTime { get; set; }

        /// <summary>
        /// 支付方式
        /// </summary>
        public string PaymentType { get; set; }
        #endregion

        #region 购销

        /// <summary>
        /// 合同总金额
        /// </summary>
        public decimal TradeAmount { get; set; }

        /// <summary>
        /// 合同利润
        /// </summary>
        public decimal TradeProfit { get; set; }

        /// <summary>
        /// 企业类型
        /// </summary>
        public string EnterpriseType { get; set; }

        /// <summary>
        /// 经营范围
        /// </summary>
        public string BusinessRange { get; set; }


        /// <summary>
        /// 不需要了？
        /// 补贴额度，比如：我要1个亿的贸易量，我补贴贸易量的5%
        /// </summary>
        public decimal Subsidies { get; set; }

        #endregion


        #region 3种类型 公共属性

        /// <summary>
        /// 仓库开户
        /// </summary>
        public string WarehouseAccount { get; set; }

        /// <summary>
        /// 发票面额
        /// </summary>
        public string InvoiceValue { get; set; }

        /// <summary>
        /// 发票开具时间
        /// </summary>
        public string InvoiceIssueDateTime { get; set; }

        /// <summary>
        /// 发票交接方式
        /// </summary>
        public string InvoiceTransferMode { get; set; }

        public bool IsMyRequest { get; set; }
        
        #endregion
        /// <summary>
        /// 需求的撮合规则
        /// </summary>
        public IEnumerable<RequirementRuleInfo> Rules { get; set; }

        public RequirementInfo()
        {
        }

        public RequirementInfo(Business.Abstraction.BizObject.RequirementInfo requirement)
        {
            RequirementId = requirement.RequirementId;
            State = requirement.State;
            EnterpriseId = requirement.EnterpriseId;
            PaymentType = requirement.PaymentType;
            PaymentDateTime = requirement.PaymentDateTime;
            PaymentAmount = requirement.PaymentAmount;
            ProductName = requirement.ProductName;
            WarehouseAccount = requirement.WarehouseAccount;
            ProductPrice = requirement.ProductPrice;
            ProductQuantity = requirement.ProductQuantity;
            ProductSpecification = requirement.ProductSpecification;
            ProductType = requirement.ProductType;
            ProductUnit = requirement.ProductUnit;
            TradeAmount = requirement.TradeAmount;
            Type = requirement.Type;
            InvoiceValue = requirement.InvoiceValue;
            InvoiceIssueDateTime = requirement.InvoiceIssueDateTime;
            InvoiceTransferMode = requirement.InvoiceTransferMode;
            TradeProfit = requirement.TradeProfit;
            BusinessRange = requirement.BusinessRange;
            Subsidies = requirement.Subsidies;
            WarehouseState = requirement.WarehouseState;
            WarehouseCity = requirement.WarehouseCity;
            WarehouseAddress1 = requirement.WarehouseAddress1;
            WarehouseAddress2 = requirement.WarehouseAddress2;
            Rules = requirement.Rules;
        }
    }
}
