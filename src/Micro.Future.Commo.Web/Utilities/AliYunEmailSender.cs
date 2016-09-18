using MailKit.Net.Smtp;
using Micro.Future.Business.DataAccess.Commo.CommoObject;
using Micro.Future.Commo.Web.Services;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Utilities
{
    public enum MailTemplate
    {
        Register = 1,
        ForgotPassword = 2,
        ChainConfirmed = 3,
        ChainLocked = 4
    }


    //https://q.cnblogs.com/q/84031/
    public class EmailOptions
    {
        public string SMTP { get; set; }
        public int PORT { get; set; }
        public bool UseSSL { get; set; }
        public string SingleSender { get; set; }
        public string SinglePassword { set; get; }
        public string BatchSender { get; set; }
        public string BatchPassword { get; set; }
        public Dictionary<MailTemplate, string> MailTemplates { get; set; }
    }


    public class AliYunEmailSender : IEmailSender
    {
        private readonly EmailOptions _options;

        public AliYunEmailSender(EmailOptions options)
        {
            _options = options;
        }

        public async Task SendBatchEmailAsync(List<string> emails, string subject, MailTemplate template)
        {
            try
            {
                var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress("UFO", _options.BatchSender));
                emails.ForEach(email =>
                {
                    mimeMessage.To.Add(new MailboxAddress("", email));
                });
                mimeMessage.Subject = subject;
                mimeMessage.Body = new TextPart(TextFormat.Html)
                {
                    Text = _GetEmailTemplate(template)
                };

                using (var client = new SmtpClient())
                {
                    client.Connect(_options.SMTP, _options.PORT, _options.UseSSL);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    // Note: since we don't have an OAuth2 token, disable
                    // the XOAUTH2 authentication mechanism.
                    client.Authenticate(_options.BatchSender, _options.BatchPassword);
                    await client.SendAsync(mimeMessage);
                    client.Disconnect(true);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<EmailVerifyCode> SendSingleEmailAsync(string email, string subject, MailTemplate template)
        {
            try
            {
                var code = _GenerateVerifyCode();
                var mimeMessage = new MimeMessage();
                mimeMessage.From.Add(new MailboxAddress("EaseMore", _options.SingleSender));
                mimeMessage.To.Add(new MailboxAddress("", email));
                mimeMessage.Subject = subject;
                mimeMessage.Body = new TextPart(TextFormat.Html)
                {
                    Text = _GetEmailTemplate(template).Replace("${email}", email).Replace("${code}", code).Replace("${validTime}", "10")
                };

                using (var client = new SmtpClient())
                {
                    client.Connect(_options.SMTP, _options.PORT, _options.UseSSL);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    // Note: since we don't have an OAuth2 token, disable
                    // the XOAUTH2 authentication mechanism.
                    client.Authenticate(_options.SingleSender, _options.SinglePassword);
                    await client.SendAsync(mimeMessage);
                    client.Disconnect(true);
                    return new EmailVerifyCode
                    {
                        VerifyCode = code,
                        RequestId = Guid.NewGuid().ToString(),
                        SendTime = DateTime.UtcNow
                    };
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string _GenerateVerifyCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        private string _GetEmailTemplate(MailTemplate template)
        {
            var html = _options.MailTemplates[template];
            using (var file = File.OpenRead(html))
            using (var sr = new StreamReader(file))
            {
                return sr.ReadToEnd();
            }
        }
    }
}
