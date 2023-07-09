using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.DTO
{
    public class QuestionDTO
    {
        [JsonPropertyName("question_id")]
        public int QuestionId { get; set; }
        [JsonPropertyName("description")]
        public string? Description { get; set; }
        [JsonPropertyName("answer_1")]
        public string? Answer1 { get; set; }
        [JsonPropertyName("answer_2")]
        public string? Answer2 { get; set; }
        [JsonPropertyName("answer_3")]
        public string? Answer3 { get; set; }
        [JsonPropertyName("answer_4")]
        public string? Answer4 { get; set; }
        [JsonPropertyName("correct_answer")]
        public int? CorrectAnswer { get; set; }
        [JsonPropertyName("test_id")]
        public int? TestId { get; set; }
        [JsonPropertyName("explaination")]
        public string? Explaination { get; set; }
    }
}
