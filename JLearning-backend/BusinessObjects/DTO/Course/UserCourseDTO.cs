using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class UserCourseDTO
    {
        [JsonPropertyName("course_id")]
        public int CourseId { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; } = null!;
        [JsonPropertyName("enrolled_date")]
        public DateTime? EnrolledDate { get; set; }
    }
}
