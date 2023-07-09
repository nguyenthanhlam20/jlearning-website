using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IBlogRepository
    {
        List<Blog> GetBlogs();
        Blog FindBlogById(int id);
        void CreateBlog(Blog b);
        void UpdateBlog(Blog b);
        void DeleteBlog(Blog b);
    }
}
