using System;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public partial class Question
    {
        public int QuestionId { get; set; }
        public string? Description { get; set; }
        public string? Answer1 { get; set; }
        public string? Answer2 { get; set; }
        public string? Answer3 { get; set; }
        public string? Answer4 { get; set; }
        public int? CorrectAnswer { get; set; }
        public int? TestId { get; set; }
        public string? Explaination { get; set; }

        public virtual Test? Test { get; set; }
    }
}
