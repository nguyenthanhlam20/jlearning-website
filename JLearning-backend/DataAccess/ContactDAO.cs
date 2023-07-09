using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class ContactDAO
    {
        public static List<Contact> GetContacts()
        {
            var listContacts = new List<Contact>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listContacts = context.Contacts.ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listContacts;
        }
        public static Contact FindContactById(int id)
        {
            Contact c = new Contact();
            try
            {
                using (var context = new JlearningContext())
                {
                    c = context.Contacts.SingleOrDefault(x => x.ContactId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return c;
        }
        public static void CreateContact(Contact c)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Contacts.Add(c);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateContact(Contact c)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Contact>(c).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}
