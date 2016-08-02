using Micro.Future.Business.MongoDB.Commo.BizObjects;
using Micro.Future.Business.MongoDB.Commo.Handler;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Business.Requirement.Handler;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Hubs
{
    public class ChainHub: Hub
    {
        private RequirementManager _manager;
        private RequirementHandler _handler;
        public ChainHub()
        {
            _handler = new RequirementHandler();
            _manager = new RequirementManager(_handler);
            _manager.OnRequirementChainChanged += _onRequirementChainChanged;
        }

        private void _onRequirementChainChanged(IEnumerable<RequirementChainInfo> chain)
        {
            Clients.All.OnRequirementChainChanged(chain);
        }

        public void CallOnChainChanged()
        {
            _handler.CallOnChainChanged(new List<ChainObject>() { }); ;
        }

    }
}
