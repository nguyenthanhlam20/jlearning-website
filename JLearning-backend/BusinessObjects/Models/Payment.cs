using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public string? Email { get; set; }
        public int? CourseId { get; set; }
        public double? Amount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CourseName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Name { get; set; }

        public virtual Course? Course { get; set; }
        public virtual Account? EmailNavigation { get; set; }
    }
}
