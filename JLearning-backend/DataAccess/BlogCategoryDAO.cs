using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class BlogCategoryDAO
    {
        public static List<BlogCategory> GetBlogCategorys()
        {
            var listBlogCategorys = new List<BlogCategory>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listBlogCategorys = context.BlogCategories.ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listBlogCategorys;
        }
    }
}
