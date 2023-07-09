using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Feedback
    {
        public int FeedbackId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int? Star { get; set; }
        public string? CourseName { get; set; }
        public string? Message { get; set; }
        public int? CourseId { get; set; }
        public string? UserAvatarUrl { get; set; }

        public virtual Course? Course { get; set; }
        public virtual Account? EmailNavigation { get; set; }
    }
}
