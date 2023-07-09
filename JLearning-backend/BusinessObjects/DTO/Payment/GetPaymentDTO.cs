
using System.Text.Json.Serialization;

namespace BusinessObjects.DTO
{
    public class GetPaymentDTO
    {
        [JsonPropertyName("email")]
        public string? Email { get; set; }
    }
}
