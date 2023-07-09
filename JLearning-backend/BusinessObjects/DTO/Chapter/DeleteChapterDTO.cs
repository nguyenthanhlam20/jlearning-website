using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class DeleteChapterDTO
    {
        [JsonPropertyName("chapter_id")]
        public int ChapterId { get; set; }
    }
}
