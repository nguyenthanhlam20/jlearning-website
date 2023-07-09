using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Account
    {
        public Account()
        {
            Feedbacks = new HashSet<Feedback>();
            LessonDones = new HashSet<LessonDone>();
            Payments = new HashSet<Payment>();
            TestDones = new HashSet<TestDone>();
            UserCourses = new HashSet<UserCourse>();
        }

        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? AvatarUrl { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public int? YearOfBirth { get; set; }
        public bool? Gender { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<LessonDone> LessonDones { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<TestDone> TestDones { get; set; }
        public virtual ICollection<UserCourse> UserCourses { get; set; }
    }
}
