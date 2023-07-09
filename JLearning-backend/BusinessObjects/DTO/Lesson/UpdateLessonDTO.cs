using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class UpdateLessonDTO
    {
        [JsonPropertyName("lesson_id")]
        public int LessonId { get; set; }
        [JsonPropertyName("lesson_name")]
        public string LessonName { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("video_url")]
        public string VideoUrl { get; set; }
        [JsonPropertyName("material_url")]
        public string MaterialUrl { get; set; }
        [JsonPropertyName("chapter_id")]
        public int ChapterId { get; set; }
        [JsonPropertyName("duration")]
        public int Duration { get; set; }
    }
}
