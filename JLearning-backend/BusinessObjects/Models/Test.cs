using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Test
    {
        public Test()
        {
            Questions = new HashSet<Question>();
            TestDones = new HashSet<TestDone>();
        }

        public int TestId { get; set; }
        public string? TestName { get; set; }
        public int? ChapterId { get; set; }
        public int? CourseId { get; set; }
        public string? Description { get; set; }
        public long? Duration { get; set; }

        public virtual Chapter? Chapter { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<TestDone> TestDones { get; set; }
    }
}
