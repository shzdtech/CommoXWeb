using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.EnterpriseModels
{
    public class EnterpriseUpdateModel
    {
        /// <summary>
        /// 企业地址
        /// </summary>
        [Display(Name = "企业地址")]
        public string Address { get; set; }
        /// <summary>
        /// 企业注册代码
        /// </summary>
        [Display(Name = "企业注册代码")]
        [Required(ErrorMessage = "企业注册代码不能为空")]
        public string RegisterNumber { get; set; }
        /// <summary>
        /// 注册时间
        /// </summary>
        [Display(Name = "企业注册时间")]
        [Required(ErrorMessage = "企业注册时间不能为空")]
        public DateTime RegisterTime { get; set; }
        /// <summary>
        /// 注册资金
        /// </summary>
        public double RegisterCapital { get; set; }
        /// <summary>
        /// 注册地址
        /// </summary>
        public string RegisterAddress { get; set; }

        /// <summary>
        /// 法人代表
        /// </summary> 
        [Display(Name = "法人代表")]
        [Required(ErrorMessage = "企业法人代表不能为空")]
        public string LegalRepresentative { get; set; }
        /// <summary>
        /// 开票量
        /// </summary>
        [Display(Name = "开票量")]
        [Required(ErrorMessage = "开票量不能为空")]
        [Range(0, double.MaxValue, ErrorMessage = "开票量不合法")]
        public double InvoicedQuantity { get; set; }
        /// <summary>
        /// 企业类型
        /// </summary>
        [Display(Name = "企业类型")]
        [Required(ErrorMessage = "企业类型不能为空")]
        public int BusinessTypeId { get; set; }
        /// <summary>
        /// 企业业务范围
        /// </summary>
        public string BusinessRange { get; set; }
        /// <summary>
        /// 信用等级
        /// </summary>
        [Display(Name = "信用等级")]
        [Required(ErrorMessage = "信用等级不能为空")]
        public int ReputationGrade { get; set; }
        /// <summary>
        /// 年检情况
        /// </summary>
        public string AnnualInspection { get; set; }
        /// <summary>
        /// 上年度营业额
        /// </summary>
        public double? PreviousSales { get; set; }
        /// <summary>
        /// 利润
        /// </summary>
        public double? PreviousProfit { get; set; }
        /// <summary>
        /// 支付方式
        /// </summary>
        [Display(Name = "支付方式")]
        [Required(ErrorMessage = "支付方式不能为空")]
        public int PaymentMethodId { get; set; }
        /// <summary>
        /// 注册银行
        /// </summary>
        [Display(Name = "注册银行")]
        [Required(ErrorMessage = "注册银行不能为空")]
        public int RegisterBankId { get; set; }
        /// <summary>
        /// 企业开户账号
        /// </summary>
        [Display(Name = "企业开户账号")]
        [Required(ErrorMessage = "企业开户账号不能为空")]
        public string RegisterAccount { get; set; }

        /// <summary>
        /// 营业执照等证件保存路径
        /// </summary>
        public string LicenseImagePath { get; set; }
    }
}
