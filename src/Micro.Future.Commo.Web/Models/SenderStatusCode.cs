using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models
{
    public enum SenderStatusCode
    {
        OK = 0,
        Failed = 1,
        Wait = 2,
        ExceedLimitation = 3,
        UserExist = 4,
        UserNotExist = 5
    }
}
