using Micro.Future.Commo.Web.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.MiddleWare
{
    public class HttpExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (HttpException httpException)
            {
                context.Response.StatusCode = (int)httpException.StatusCode;
                context.Response.Headers.Add("charset", "gb2312");
                var responseFeature = context.Features.Get<IHttpResponseFeature>();
                responseFeature.ReasonPhrase = httpException.Message;
            }
        }
    }
}
