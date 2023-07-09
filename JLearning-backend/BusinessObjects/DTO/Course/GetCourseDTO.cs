
using System.Text.Json.Serialization;

namespace BusinessObjects.DTO
{
    public class GetCourseDTO
    {
        [JsonPropertyName("course_id")]
        public int CourseId { get; set; }
    }
}
