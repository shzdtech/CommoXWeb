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

        [Required(ErrorMessage = "您的联系方式不能为空")]
        [Phone(ErrorMessage = "您的电话号码格式不正确")]
        [Display(Name = "联系方式")]
        public string MobilePhone { get; set; }

        /// <summary>
        /// 企业传真
        /// </summary>
        public string Fax { get; set; }

        [Required(ErrorMessage = "您的注册码不正确")]
        [Display(Name = "注册码")]
        public string VerificationCode { get; set; }

        /// <summary>
        /// 登录密码
        /// </summary>
        [Required(ErrorMessage = "您输入的密码不符合规范")]
        [Display(Name = "登录密码")]
        public string Password { get; set; }
    }
}
