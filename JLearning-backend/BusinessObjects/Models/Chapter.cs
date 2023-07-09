using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Chapter
    {
        public Chapter()
        {
            Lessons = new HashSet<Lesson>();
            Tests = new HashSet<Test>();
        }

        public int ChapterId { get; set; }
        public string? ChapterName { get; set; }
        public string? Description { get; set; }
        public int? CourseId { get; set; }

        public virtual Course? Course { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }
}
