using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Models
{
    public class CreateChainOptions
    {
        public int? FixedLength { get; set; }
        public bool FixedPosition { get; set; }
        public int? MaxLength { get; set; }
        public bool ForceCreate { get; set; }
        public List<int> Requirements { get; set; }
    }
}
