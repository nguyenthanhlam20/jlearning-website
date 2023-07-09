using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class BlogCategory
    {
        public BlogCategory()
        {
            Blogs = new HashSet<Blog>();
        }

        public int BlogCategoryId { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Blog> Blogs { get; set; }
    }
}
