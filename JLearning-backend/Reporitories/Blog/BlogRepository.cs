using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class BlogRepository : IBlogRepository
    {
        public void CreateBlog(Blog b)=>BlogDAO.CreateBlog(b);

        public void DeleteBlog(Blog b) => BlogDAO.DeleteBlog(b);

        public Blog FindBlogById(int id) => BlogDAO.FindBlogById(id);

        public List<Blog> GetBlogs() => BlogDAO.GetBlogs();

        public void UpdateBlog(Blog b) => BlogDAO.UpdateBlog(b);
    }
}
