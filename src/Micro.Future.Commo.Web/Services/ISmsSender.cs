using Micro.Future.Business.DataAccess.Commo.CommoObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Services
{
    public interface ISmsSender
    {
        Task<SMSVerifyCode> SendSmsAsync(string number);
    }
}
