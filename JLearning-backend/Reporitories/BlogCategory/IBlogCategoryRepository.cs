using System;
using BusinessObjects.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IBlogCategoryRepository
    {
        List<BlogCategory> GetBlogCategorys();
    }
}
