using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_dotnet.Models
{
    public class Provider
    {
        [Key]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; } 

        public User Account { get; set; } = null!;

        [Required] 
        [StringLength(50)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        [Column("provider_type")]
        public string ProviderType { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [Column("provider_location")]
        public string ProviderLocation { get; set; } = string.Empty;
    }
}
