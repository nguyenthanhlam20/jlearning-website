using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class SupportDAO
    {
        public static List<Support> GetSupports()
        {
            var listSupports = new List<Support>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listSupports = context.Supports.ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listSupports;
        }
        public static Support FindSupportById(int id)
        {
            Support support = new Support();
            try
            {
                using (var context = new JlearningContext())
                {
                    support = context.Supports.SingleOrDefault(x => x.SupportId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return support;
        }
        public static void CreateSupport(Support support)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Supports.Add(support);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

               Console.WriteLine("Error while trying to create new support " + e.Message);
            }
        }
        public static void UpdateSupport(Support support)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Support>(support).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteSupport(Support support)
        {
            try
            {
                using (var context = new JlearningContext())
                {

                    var sup = context.Supports.SingleOrDefault(x => x.SupportId == support.SupportId);
                    context.Supports.Remove(sup);
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
