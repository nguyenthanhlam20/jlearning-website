using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class BlogDetailRepository : IBlogDetailRepository
    {
        public void CreateBlogDetail(BlogDetail b) =>BlogDetailDAO.CreateBlogDetail(b);

        public void DeleteBlogDetail(BlogDetail b)=> BlogDetailDAO.DeleteBlogDetail(b);

        public BlogDetail FindBlogDetailById(int id) => BlogDetailDAO.FindBlogDetailById(id);

        public List<BlogDetail> GetBlogDetails()=> BlogDetailDAO.GetBlogDetails();

        public void UpdateBlogDetail(BlogDetail b) => BlogDetailDAO.UpdateBlogDetail(b);
    }
}
