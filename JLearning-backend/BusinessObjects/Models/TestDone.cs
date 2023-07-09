using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class TestDone
    {
        public string Email { get; set; } = null!;
        public int TestId { get; set; }
        public int CourseId { get; set; }

        public virtual Course Course { get; set; } = null!;
        public virtual Account EmailNavigation { get; set; } = null!;
        public virtual Test Test { get; set; } = null!;
    }
}
