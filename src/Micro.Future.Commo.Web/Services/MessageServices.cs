using Micro.Future.Business.DataAccess.Commo.CommoObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        public Task SendBatchEmailAsync(List<string> emails, string subject, Utilities.MailTemplate template)
        {
            throw new NotImplementedException();
        }

        public Task<EmailVerifyCode> SendSingleEmailAsync(string email, string subject, Utilities.MailTemplate template)
        {
            throw new NotImplementedException();
        }

        public Task<SMSVerifyCode> SendSmsAsync(string number)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult<SMSVerifyCode>(null);
        }
    }
}
