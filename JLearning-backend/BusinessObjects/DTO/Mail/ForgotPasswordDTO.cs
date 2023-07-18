using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class ForgotPasswordDTO
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("link")]
        public string Link { get; set; }
        [JsonPropertyName("subject")]
        public string Subject { get; set; }
    }
}
