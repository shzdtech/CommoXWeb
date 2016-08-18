using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int EnterpriseId { get; set; }

        /// <summary>
        /// 初始密码
        /// </summary>
        public string InitialPassword { get; set; }
    }
}
