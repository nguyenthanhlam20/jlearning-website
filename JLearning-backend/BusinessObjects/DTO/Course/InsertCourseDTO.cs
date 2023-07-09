using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class InsertCourseDTO
    {
        [JsonPropertyName("avatar_url")]
        public string CourseAvatarUrl { get; set; }
        [JsonPropertyName("course_name")]
        public string CourseName { get; set; }
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("duration")]
        public int Duration { get; set; }
        [JsonPropertyName("price")]
        public double Price { get; set; }
        [JsonPropertyName("status")]
        public bool Status { get; set; }
    }
}
