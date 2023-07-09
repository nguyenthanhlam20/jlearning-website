using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Support
    {
        public int SupportId { get; set; }
        public string? SupportName { get; set; }
        public string? Message { get; set; }
    }
}
