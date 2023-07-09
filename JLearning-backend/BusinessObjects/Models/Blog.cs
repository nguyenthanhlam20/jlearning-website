using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Blog
    {
        public Blog()
        {
            BlogDetails = new HashSet<BlogDetail>();
        }

        public string? BlogAvatarUrl { get; set; }
        public int BlogId { get; set; }
        public int? BlogCategoryId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? BlogName { get; set; }
        public string? BlogDescription { get; set; }
        public bool? Status { get; set; }

        public virtual BlogCategory? BlogCategory { get; set; }
        public virtual ICollection<BlogDetail> BlogDetails { get; set; }
    }
}
