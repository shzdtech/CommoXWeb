using Micro.Future.Commo.Web.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Attributes
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            var jsonResult = new JsonResult(new { Message = context.Exception.Message })
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
            };

            if (context.Exception is HttpException)
            {
                jsonResult.StatusCode = (int)((HttpException)context.Exception).StatusCode;
            }

            context.Result = jsonResult;
        }
    }
}
