using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Exceptions
{
    public class HttpException : Exception
    {
        private readonly HttpStatusCode _httpStatusCode;

        public HttpException(HttpStatusCode httpStatusCode, string message) : base(message)
        {
            _httpStatusCode = httpStatusCode;
        }

        public HttpException(HttpStatusCode httpStatusCode, string message, Exception inner) : base(message, inner)
        {
            _httpStatusCode = httpStatusCode;
        }

        public HttpStatusCode StatusCode { get { return _httpStatusCode; } }
    }
}
