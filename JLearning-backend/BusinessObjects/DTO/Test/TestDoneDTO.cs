using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class TestDoneDTO
    {
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("test_id")]
        public int? TestId { get; set; }
        [JsonPropertyName("course_id")]
        public int? CourseId { get; set; }

    }
}
