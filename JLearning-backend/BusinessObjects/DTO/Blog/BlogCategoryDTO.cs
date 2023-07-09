using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class BlogCategoryDTO
    {
        [JsonPropertyName("blog_category_id")]
        public int? BlogCategoryId { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
