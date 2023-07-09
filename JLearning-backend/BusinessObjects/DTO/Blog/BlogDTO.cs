using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class BlogDTO
    {
        
        [JsonPropertyName("blog_avatar_url")]
        public string? BlogAvatarUrl { get; set; }
        [JsonPropertyName("blog_id")]
        public int BlogId { get; set; }
        [JsonPropertyName("blog_category_id")]
        public int? BlogCategoryId { get; set; }
        [JsonPropertyName("created_date")]
        public DateTime? CreatedDate { get; set; }
        [JsonPropertyName("blog_name")]
        public string? BlogName { get; set; }
        [JsonPropertyName("blog_description")]
        public string? BlogDescription { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }

        [JsonPropertyName("blog_details")]

        public virtual ICollection<BlogDetailDTO>? BlogDetails { get; set; }

    }
}
