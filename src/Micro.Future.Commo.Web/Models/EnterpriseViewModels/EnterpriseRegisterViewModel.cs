using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.EnterpriseViewModels
{
    public class EnterpriseRegisterViewModel
    {
        [Required]
        /// <summary>
        /// 企业名称
        /// </summary>
        [Display(Name = "企业名称")]
        public string Name { get; set; }

        /// <summary>
        /// 企业地址
        /// </summary>
        [Display(Name = "企业地址")]
        public string Address { get; set; }

        /// <summary>
        /// 联系人
        /// </summary>
        [Required]
        [Display(Name = "联系人")]
        public string Contacts { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "企业邮箱")]
        public string Email { get; set; }


        /// <summary>
        /// 企业注册代码
        /// </summary>
        [Display(Name = "企业代码")]
        public string RegisterNumber { get; set; }


        /// <summary>
        /// 注册时间
        /// </summary>
        [Display(Name = "注册时间")]
        public DateTime RegisterTime { get; set; }

        /// <summary>
        /// 注册资金
        /// </summary>
        [Display(Name = "注册资金")]
        public double RegisterCapital { get; set; }


        /// <summary>
        /// 注册地址
        /// </summary>
        [Display(Name = "注册地址")]
        public string RegisterAddress { get; set; }


        /// <summary>
        /// 企业类型
        /// </summary>
        [Display(Name = "企业类型")]
        public int BusinessTypeId { get; set; }

        /// <summary>
        /// 经营范围
        /// </summary>
        [Display(Name = "经营范围")]
        public string BusinessRange { get; set; }
    }
}
