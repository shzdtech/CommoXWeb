using Micro.Future.Business.DataAccess.Commo.CommoObject;
using Micro.Future.Commo.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Services
{
    public interface IEmailSender
    {
        Task<EmailVerifyCode> SendSingleEmailAsync(string email, string subject, MailTemplate template);

        Task SendBatchEmailAsync(List<string> emails, string subject, MailTemplate template);
    }
}
