using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.AccountModels
{
    public class ResetPasswordModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "注册邮箱")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "重置密码")]
        public string Password { get; set; }

        [Required]
        [Display(Name = "注册码")]
        public string VerificationCode { get; set; }

    }
}
