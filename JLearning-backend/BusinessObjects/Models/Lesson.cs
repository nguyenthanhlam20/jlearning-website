using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Lesson
    {
        public Lesson()
        {
            LessonDones = new HashSet<LessonDone>();
        }

        public int LessonId { get; set; }
        public string? LessonName { get; set; }
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
        public string? MaterialUrl { get; set; }
        public int? ChapterId { get; set; }
        public int? Duration { get; set; }

        public virtual Chapter? Chapter { get; set; }
        public virtual ICollection<LessonDone> LessonDones { get; set; }
    }
}
