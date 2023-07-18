using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class ContactDTO
    {
        [JsonPropertyName("contact_id")]
        public int? ContactId { get; set; }
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("request_date")]
        public DateTime? RequestDate { get; set; }
        [JsonPropertyName("response_date")]
        public DateTime? ResponseDate { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; }
        [JsonPropertyName("subject")]

        public string? Subject { get; set; }
        [JsonPropertyName("request_message")]
        public string? RequestMessage { get; set; }
        [JsonPropertyName("response_message")]
        public string? ResponseMessage { get; set; }
    }

   
}
