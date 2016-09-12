using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Micro.Future.Commo.Web.Services;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using System.Text;
using Micro.Future.Business.DataAccess.Commo.CommoObject;
using Newtonsoft.Json.Linq;
using System.Net;

namespace Micro.Future.Commo.Web.Utilities
{
    public class AliYunSmsOptions
    {
        public string SmsGateway { get; set; }
        public string Action { get; set; }
        public string SignName { get; set; }
        public string TemplateCode { get; set; }
        public string Format { get; set; }
        public string Version { get; set; }
        public string AccessKeyId { get; set; }
        public string AccessKeySecret { get; set; }
        public string SignatureMethod { get; set; }
        public string SignatureVersion { get; set; }
    }

    public class AliYunSmsSender : ISmsSender
    {
        public const int TIME_OUT = 5000;
        //private static HttpClient _backChannel =
        //    new HttpClient(new HttpClientHandler() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true });
        private static HttpClient _backChannel = new HttpClient();

        private AliYunSmsOptions _options;
        private ILogger<AliYunSmsSender> _logger;
        private HMACSHA1 _hasher;

        public AliYunSmsSender(ILoggerFactory loggerFactory, IOptions<AliYunSmsOptions> options)
        {
            _logger = loggerFactory.CreateLogger<AliYunSmsSender>();
            _options = options.Value;
            _hasher = new HMACSHA1(Encoding.UTF8.GetBytes(_options.AccessKeySecret + "&"));
        }

        public async Task<SMSVerifyCode> SendSmsAsync(string number)
        {
            var code = _GenerateVerifyCode();

            var sortedDict = new SortedDictionary<string, string>(StringComparer.Ordinal)
            {
                {"Action", _options.Action},
                {"SignName", _options.SignName},
                {"TemplateCode", _options.TemplateCode},
                {"RecNum", number},
                {"ParamString", "{'mobile':'" + number + "','code':'" + code + "','validTime':'5分钟'}" },
                {"Format", _options.Format},
                {"Version", _options.Version},
                {"AccessKeyId", _options.AccessKeyId},
                {"SignatureMethod", _options.SignatureMethod},
                {"Timestamp", _GetTimestamp()},
                {"SignatureVersion", _options.SignatureVersion},
                {"SignatureNonce", _GetSignatureNonce()},
            };

            var sig = GenSignature(sortedDict);
            sortedDict.Add("Signature", sig);
            string content = BuildQueryString(sortedDict);
            _logger.LogInformation(content);

            var httpContent = new StringContent(content, Encoding.UTF8, "application/x-www-form-urlencoded");

            var task = _backChannel.PostAsync(_options.SmsGateway, httpContent);
            if (!task.Wait(TIME_OUT))
            {
                _logger.LogError("Send Sms Timeout!");
                throw new TimeoutException();
            }

            var response = task.Result;

            var stringResp = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var json = JObject.Parse(stringResp);
                if (json.GetValue("RequestId") != null)
                {
                    return new SMSVerifyCode
                    {
                        VerifyCode = code,
                        RequestId = json.GetValue("RequestId").ToString(),
                        SendTime = DateTime.UtcNow
                    };
                }
            }

            _logger.LogError(response.ReasonPhrase);
            _logger.LogError(stringResp);
            throw new HttpRequestException(stringResp);
        }


        private string _GenerateVerifyCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        private string _GetSignatureNonce()
        {
            return Guid.NewGuid().ToString();
        }

        private string _GetTimestamp()
        {
            return DateTime.UtcNow.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'");
        }
        private string GenSignature(SortedDictionary<string, string> sortedDic)
        {
            var canonicalizedQueryString = BuildQueryString(sortedDic);
            var stringToSign = "POST&%2F&" + WebUtility.UrlEncode(canonicalizedQueryString);
            var bs = _hasher.ComputeHash(Encoding.UTF8.GetBytes(stringToSign));
            return Convert.ToBase64String(bs);
        }

        public static string BuildQueryString(IDictionary<string, string> dict)
        {
            return string.Join("&", dict.Select(x => x.Key + "=" + WebUtility.UrlEncode(x.Value)));
        }
    }
}
