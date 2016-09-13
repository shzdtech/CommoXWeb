using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.EnterpriseModels
{
    public class EnterpriseRegisterModel
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
        public string EmailAddress { get; set; }

        [Required]
        [Phone]
        [Display(Name = "联系方式")]
        public string MobilePhone { get; set; }

        /// <summary>
        /// 企业传真
        /// </summary>
        public string Fax { get; set; }

        [Required]
        [Display(Name = "注册码")]
        public string VerificationCode { get; set; }
    }
}
