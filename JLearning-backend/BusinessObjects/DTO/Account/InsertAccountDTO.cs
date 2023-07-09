
using System.Text.Json.Serialization;

namespace BusinessObjects.DTO
{
    public class InsertAccountDTO
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("fullname")]
        public string Name { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("role_id")]
        public int RoleId { get; set; }
    }
}
