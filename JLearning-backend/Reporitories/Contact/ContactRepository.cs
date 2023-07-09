using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class ContactRepository : IContactRepository
    {
        public void CreateContact(Contact c)=>ContactDAO.CreateContact(c);

        public Contact FindContactById(int id) => ContactDAO.FindContactById(id);

        public List<Contact> GetContacts() => ContactDAO.GetContacts();

        public void UpdateContact(Contact c) => ContactDAO.UpdateContact(c);
    }
}
