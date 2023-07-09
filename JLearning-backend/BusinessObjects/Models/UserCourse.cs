using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class UserCourse
    {
        public int CourseId { get; set; }
        public string Email { get; set; } = null!;
        public DateTime? EnrolledDate { get; set; }

        public virtual Course Course { get; set; } = null!;
        public virtual Account EmailNavigation { get; set; } = null!;
    }
}
