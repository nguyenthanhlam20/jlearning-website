using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class BlogCategoryRepository : IBlogCategoryRepository
    {
        public List<BlogCategory> GetBlogCategorys() => BlogCategoryDAO.GetBlogCategorys();
    }
}
