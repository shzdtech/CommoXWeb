﻿using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Commo.Business.Abstraction.BizObject;
using Micro.Future.Commo.Business.Abstraction.BizObject.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Controllers.Api
{
    [Authorize]
    [Route("api/Order")]
    public class OrderController : BaseController
    {
        private ITradeManager _tradeManager;
        private UserManager<Models.ApplicationUser> _userManager;
        private IOptions<CommoSettings> _commoSettingsAccessor;

        public OrderController(UserManager<Models.ApplicationUser> userManager,
            ITradeManager tradeManager,
            IOptions<CommoSettings> commoSettingsAccessor) : base(userManager)
        {
            _tradeManager = tradeManager;
            _userManager = userManager;
            _commoSettingsAccessor = commoSettingsAccessor;
        }

        [HttpPost]
        [Route("{id:int}/State/{state:int}")]
        public async Task UpdateTradeState(int id, OrderStateType state)
        {
            var user = await _userManager.GetUserAsync(User);
            _tradeManager.UpdateOrderState(id, state, user.Id);
        }

        [HttpPost]
        [Route("{id:int}/Trade/{tradeId:int}/Files/Type/{type:int}")]
        public IList<OrderImageInfo> UploadFiles(int id, int tradeId, OrderFileType type)
        {
            var files = HttpContext.Request.Form.Files.ToArray();
            var list = new List<OrderImageInfo>();
            if (files != null)
            {
                for (int i = 0; i < files.Length; i++)
                {
                    var filePath = _SaveImages(files[i]);
                    list.Add(new OrderImageInfo
                    {
                        OrderId = id,
                        CreateTime = DateTime.Now,
                        UpdateTime = DateTime.Now,
                        ImagePath = filePath,
                        ImageType = type,
                        Position = i + 1,
                        TradeId = tradeId
                    });
                }
            }

            var result = _tradeManager.BulkSaveOrderImages(list);
            if (result == null)
            {
                result = new List<OrderImageInfo>();
            }

            return result;
        }

        [HttpDelete]
        [Route("OrderImage/{imageId:int}")]
        public void DeleteOrderImage(int imageId)
        {
            _tradeManager.DeleteOrderImage(imageId);
        }

        private string _SaveImages(IFormFile imageFile)
        {
            var filePath = @"wwwroot/" + _commoSettingsAccessor.Value.OrderImageFolder;
            var fileName = Path.GetFileNameWithoutExtension(imageFile.FileName) + "_" + Guid.NewGuid() + Path.GetExtension(imageFile.FileName);

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            var fullPath = Path.Combine(filePath, fileName);
            using (var stream = System.IO.File.Create(fullPath))
            {
                imageFile.OpenReadStream().CopyTo(stream);
            }

            return @"/" + _commoSettingsAccessor.Value.OrderImageFolder + @"/" + fileName;
        }
    }
}
