using Micro.Future.Business.DataAccess.Commo.CommoObject;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models.AccountModels
{
    public class UserInfo
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
        public string Email { get; set; }
        public int EnterpriseId { get; set; }
        public string EnterpriseName { get; set; }
        public EnterpriseStateType EnterpriseState { get; set; }


        public UserInfo(ApplicationUser user, List<string> roles)
        {
            UserId = user.Id;
            EnterpriseId = user.EnterpriseId;
            UserName = user.UserName;
            Roles = roles;
            Email = user.Email;
        }
    }
}
