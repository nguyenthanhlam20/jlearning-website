using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class UpdateChapterDTO
    {
        [JsonPropertyName("chapter_id")]
        public int ChapterId { get; set; }
        [JsonPropertyName("chapter_name")]
        public string ChapterName { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("course_id")]
        public int CourseId { get; set; }
    }
}
