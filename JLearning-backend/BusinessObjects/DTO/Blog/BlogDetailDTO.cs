using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class BlogDetailDTO
    {

        [JsonPropertyName("blog_details_id")]
        public int BlogDetailsId { get; set; }

        [JsonPropertyName("blog_id")]
        public int? BlogId { get; set; }
        [JsonPropertyName("blog_img_url")]
        public string? BlogImgUrl { get; set; }
        [JsonPropertyName("header")]
        public string? Header { get; set; }
        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }
}
