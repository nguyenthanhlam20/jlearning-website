using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class DeleteLessonDTO
    {
        [JsonPropertyName("lesson_id")]
        public int LessonId { get; set; }
    }
}
