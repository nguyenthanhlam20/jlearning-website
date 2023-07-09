using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Course
    {
        public Course()
        {
            Chapters = new HashSet<Chapter>();
            Feedbacks = new HashSet<Feedback>();
            LessonDones = new HashSet<LessonDone>();
            Payments = new HashSet<Payment>();
            TestDones = new HashSet<TestDone>();
            UserCourses = new HashSet<UserCourse>();
        }

        public int CourseId { get; set; }
        public string? CourseAvatarUrl { get; set; }
        public string? CourseName { get; set; }
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public double? Price { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Chapter> Chapters { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<LessonDone> LessonDones { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<TestDone> TestDones { get; set; }
        public virtual ICollection<UserCourse> UserCourses { get; set; }
    }
}
