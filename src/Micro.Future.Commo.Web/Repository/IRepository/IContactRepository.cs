using Micro.Future.Commo.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Micro.Future.Commo.Web.Repository.IRepository
{
    public interface IContactRepository
    {
        void Add(Contact item);
        IEnumerable<Contact> GetAll();
        Contact Find(string key);
        void Remove(string Id);
        void Update(Contact item);
    }
}
