using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Web.Exceptions;
using Micro.Future.Commo.Web.Services;
using Micro.Future.Commo.Web.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Route("api/Chain")]
    public class ChainController : BaseController
    {
        private IRequirementManager _requirementManager;
        private IChainManager _chainManager;
        private IMatchMakerManager _matchMakerManger;
        private IEnterpriseManager _enterpriseManager = null;
        private readonly IEmailSender _emailSender;

        public ChainController(UserManager<Models.ApplicationUser> userManager, IRequirementManager requirementManager, IChainManager chainManager, IMatchMakerManager matchMakerManger, IEnterpriseManager enterpriseManager, IEmailSender emailSender)
            : base(userManager)
        {
            _requirementManager = requirementManager;
            _chainManager = chainManager;
            _matchMakerManger = matchMakerManger;
            _enterpriseManager = enterpriseManager;
            _emailSender = emailSender;
        }

        //[HttpPost]
        //[Route("{id:int}/Confirmation/{requirementId:int}")]
        //public int ConfirmChain(int id, int requirementId)
        //{
        //    int tradeId;
        //    //_chainManager.ConfirmRequirement(id, requirementId, out tradeId);
        //    return tradeId;
        //}

        //[HttpGet]
        //[Route("")]
        //public IEnumerable<Models.ChainInfo> Get()
        //{
        //    var userId = "1";
        //    return _chainManager.QueryChains(userId).Select(c => new Models.ChainInfo(c, "1")).ToList(); ;
        //}

        [HttpGet]
        [Route("Status/{statusId:int}/Chains")]
        [Authorize(Roles = "Admin")]
        public IEnumerable<Models.ChainInfo> Get(ChainStatusType statusId)
        {
            var chainList = _chainManager.QueryAllChains(statusId).Data;
            if (chainList == null)
            {
                return new List<Models.ChainInfo>();
            }

            return chainList.Select(c => new Models.ChainInfo(c)).ToList();
        }

        [HttpPost]
        [Route("{id:int}/Status/{status:int}")]
        [Authorize(Roles = "Admin")]
        public async Task ChangeChainStatus(int id, ChainStatusType status)
        {
            var user = await _GetUser();
            bool updateSuccess = false;
            if (status == ChainStatusType.OPEN)
            {
                updateSuccess = _chainManager.LockChain(user.Id, id);
            }
            else if (status == ChainStatusType.LOCKED)
            {
                int tradeId;
                updateSuccess = _chainManager.ComfirmChain(user.Id, id, out tradeId);
            }

            if (updateSuccess)
            {
                _SendChainMessage(id, status);
            }
        }

        [HttpPost]
        [Route("{id:int}/Unlock")]
        [Authorize(Roles = "Admin")]
        public async Task UnlockChain(int id)
        {
            var user = await _GetUser();
            _chainManager.UnlockChain(user.Id, id);
        }

        [HttpPost]
        [Route("Maker")]
        [Authorize(Roles = "Admin")]
        public void MakeChain()
        {
            _matchMakerManger.Make();
        }

        [HttpGet]
        [Route("{id:int}/Requirment/{index:int}/Replacement")]
        [Authorize(Roles = "Admin")]
        public IEnumerable<Models.RequirementInfo> GetReplacement(int id, int index)
        {
            var result = _chainManager.FindReplacedRequirementsForChain(id, index, 10);
            var requirements = new List<Models.RequirementInfo>();
            if (result != null)
            {
                requirements = result.Select(r => new Models.RequirementInfo(r)).ToList();
            }

            return requirements;
        }

        [HttpPost]
        [Route("{id:int}/Index/{index:int}/NewRequirment/{requirementId:int}")]
        [Authorize(Roles = "Admin")]
        public void ReplaceRequirement(int id, int index, int requirementId)
        {
            _chainManager.ReplaceRequirementsForChain(id, new List<int>() { index }, new List<int>() { requirementId });
        }

        [HttpPost]
        [Route("Manual")]
        [Authorize(Roles = "Admin")]
        public Models.ChainInfo CreateChainManually(Models.CreateChainOptions options)
        {
            if (options.Requirements == null || options.Requirements.Count == 0)
            {
                throw new BadRequestException("请选择需求");
            }

            RequirementChainInfo chainInfo;

            if (options.ForceCreate)
            {
                chainInfo = _chainManager.CreateChain(options.Requirements, UserId);
            }
            else
            {
                chainInfo = _chainManager.AutoMatchRequirements(UserId, options.Requirements, options.FixedLength, options.FixedPosition, options.MaxLength.HasValue ? options.MaxLength.Value : 6);
            }

            if (chainInfo == null)
            {
                throw new BadRequestException("您所选择的需求暂时无法匹配成功");
            }

            return new Models.ChainInfo(chainInfo);
        }

        #region Private

        private void _SendChainMessage(int chainId, ChainStatusType status)
        {
            var chainInfo = _chainManager.GetChainInfo(chainId);
            if (chainInfo != null && chainInfo.Requirements != null && chainInfo.Requirements.Count > 0)
            {
                foreach (var requirement in chainInfo.Requirements)
                {
                    var enterpriseInfo = _enterpriseManager.QueryEnterpriseInfo(requirement.EnterpriseId);
                    if (enterpriseInfo != null && string.IsNullOrWhiteSpace(enterpriseInfo.EmailAddress))
                    {
                        _SendChainOperateMail(status, chainInfo, requirement, enterpriseInfo);
                    }
                }
            }
        }

        private void _SendChainOperateMail(ChainStatusType status, RequirementChainInfo chainInfo, RequirementInfo requirement, EnterpriseInfo enterpriseInfo)
        {
            bool isConfirm = status == ChainStatusType.CONFIRMED ? true : false;
            string subject = isConfirm ? "撮合链确认邮件" : "撮合链锁定右键";
            MailTemplate template = isConfirm ? MailTemplate.ChainConfirmed : MailTemplate.ChainLocked;
            _emailSender.SendSingleEmailAsync(enterpriseInfo.EmailAddress, subject, template);
        }

        #endregion
    }
}
