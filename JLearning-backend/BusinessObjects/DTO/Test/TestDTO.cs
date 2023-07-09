﻿using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class TestDTO
    {
        [JsonPropertyName("test_id")]
        public int? TestId { get; set; }
        [JsonPropertyName("test_name")]
        public string? TestName { get; set; }
        [JsonPropertyName("chapter_id")]
        public int? ChapterId { get; set; }
        [JsonPropertyName("chapter_name")]
        public string? ChapterName { get; set; }
        [JsonPropertyName("course_id")]
        public int? CourseId { get; set; }
        [JsonPropertyName("course_name")]
        public string? CourseName { get; set; }
        [JsonPropertyName("description")]
        public string? Description { get; set; }
        [JsonPropertyName("duration")]
        public long? Duration { get; set; }
        [JsonPropertyName("questions")]
        public virtual ICollection<QuestionDTO>? Questions { get; set; }
    }
}
