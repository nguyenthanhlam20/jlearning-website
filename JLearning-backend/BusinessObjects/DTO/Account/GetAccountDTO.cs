
using System.Text.Json.Serialization;


namespace BusinessObjects.DTO
{
    public class GetAccountDTO
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
