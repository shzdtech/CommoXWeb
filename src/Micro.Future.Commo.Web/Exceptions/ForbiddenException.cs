using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Exceptions
{
    public class ForbiddenException : HttpException
    {
        public ForbiddenException(string message) : base(HttpStatusCode.Forbidden, message)
        {
        }
    }
}
