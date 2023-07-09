using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class BlogDAO
    {
        public static List<Blog> GetBlogs()
        {
            var listBlogs = new List<Blog>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listBlogs = context.Blogs.Include(x=>x.BlogDetails).ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listBlogs;
        }
        public static Blog FindBlogById(int id)
        {
            Blog b = new Blog();
            try
            {
                using (var context = new JlearningContext())
                {
                    b = context.Blogs.Include(u => u.BlogDetails).SingleOrDefault(x => x.BlogId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return b;
        }
        public static void CreateBlog(Blog b)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Blogs.Add(b);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateBlog(Blog b)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Blog>(b).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteBlog(Blog b)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    var bookDetail = context.BlogDetails.Where(x => x.BlogId == b.BlogId).ToList();
                    context.BlogDetails.RemoveRange(bookDetail);

                    var Blog = context.Blogs.SingleOrDefault(x => x.BlogId == b.BlogId);
                    context.Blogs.Remove(Blog);
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
