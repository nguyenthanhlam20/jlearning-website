using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class FeedbackDTO
    {
        [JsonPropertyName("feedback_id")]
        public int? FeedbackId { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("star")]
        public int? Star { get; set; }
        [JsonPropertyName("course_name")]
        public string? CourseName { get; set; }
        [JsonPropertyName("message")]
        public string? Message { get; set; }
        [JsonPropertyName("course_id")]
        public int? CourseId { get; set; }
        [JsonPropertyName("user_avatar_url")]
        public string? UserAvatarUrl { get; set; }
    }
}
