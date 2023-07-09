
using System.Text.Json.Serialization;

namespace BusinessObjects.DTO
{
    public class PaymentDTO
    {
        [JsonPropertyName("payment_id")]
        public int PaymentId { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("course_id")]
        public int? CourseId { get; set; }
        
        [JsonPropertyName("amount")]
        public double Amount { get; set; }
        
        [JsonPropertyName("created_date")]
        public DateTime? CreatedDate { get; set; }
        
        [JsonPropertyName("course_name")]
        public string? CourseName { get; set; }
        
        [JsonPropertyName("phone")]
        public string? Phone { get; set; }
        
        [JsonPropertyName("address")]
        public string? Address { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }

    }
}


