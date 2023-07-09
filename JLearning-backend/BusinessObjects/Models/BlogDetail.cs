using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class BlogDetail
    {
        public int BlogDetailsId { get; set; }
        public string? Header { get; set; }
        public string? Description { get; set; }
        public string? BlogImgUrl { get; set; }
        public int? BlogId { get; set; }

        public virtual Blog? Blog { get; set; }
    }
}
