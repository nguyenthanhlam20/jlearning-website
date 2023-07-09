using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IBlogDetailRepository
    {
        List<BlogDetail> GetBlogDetails();
        BlogDetail FindBlogDetailById(int id);
        void CreateBlogDetail(BlogDetail b);
        void UpdateBlogDetail(BlogDetail b);
        void DeleteBlogDetail(BlogDetail b);
    }
}
