using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IContactRepository
    {
        List<Contact> GetContacts();
        Contact FindContactById(int id);
        void CreateContact(Contact c);
        void UpdateContact(Contact c);
    }
}
