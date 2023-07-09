using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class BlogDetailDAO
    {
        public static List<BlogDetail> GetBlogDetails()
        {
            var listBlogDetails = new List<BlogDetail>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listBlogDetails = context.BlogDetails.ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listBlogDetails;
        }
        public static BlogDetail FindBlogDetailById(int id)
        {
            BlogDetail b = new BlogDetail();
            try
            {
                using (var context = new JlearningContext())
                {
                    b = context.BlogDetails.SingleOrDefault(x => x.BlogDetailsId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return b;
        }

        public static void CreateBlogDetail(BlogDetail b)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.BlogDetails.Add(b);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateBlogDetail(BlogDetail b)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<BlogDetail>(b).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteBlogDetail(BlogDetail b)
        {
            try
            {
                using (var context = new JlearningContext())
                {

                    var BlogDetail = context.BlogDetails.SingleOrDefault(x => x.BlogDetailsId == b.BlogDetailsId);
                    context.BlogDetails.Remove(BlogDetail);
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
