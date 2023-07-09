using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class SupportDTO
    {
        [JsonPropertyName("support_id")]
        public int SupportId { get; set; }
        [JsonPropertyName("support_name")]
        public string? SupportName { get; set; }
        [JsonPropertyName("message")]
        public string? Message { get; set; }
    }
}
