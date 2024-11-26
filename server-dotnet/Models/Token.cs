using System.ComponentModel.DataAnnotations;

namespace server_dotnet.Models
{
    public class Token
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public string Value { get; set; }

    }
}
