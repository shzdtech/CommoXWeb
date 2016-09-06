using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models
{
    public class ApiResponse<T>
    {
        public ResponseStatus Status { get; set; }

        public T Data { get; set; }
    }

    public class ResponseStatus
    {
        /// <summary>
        /// 状态, success/failure/warning
        /// </summary>
        public string Ack { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public IList<ApiError> Errors { get; set; }
    }

    public class ResponseStatusAck
    {
        public static readonly string SUCCESS = "success";
        public static readonly string FAILURE = "failure";
        public static readonly string WARNING = "warning";
    }

    public class ApiError
    {
        public int ErrorCode { get; set; }

        public string Message { get; set; }

        /// <summary>
        /// 如果是某一个字段错误，可以设置Field
        /// </summary>
        public string FieldName { get; set; }
    }
}
