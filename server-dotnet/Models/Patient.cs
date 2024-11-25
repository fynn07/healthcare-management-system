using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server_dotnet.Models;

public class Patient
{

    [Key]
    public int Id { get; set; }

    [ForeignKey("Provider")]
    [Column("provider_id")]
    public int ProviderId { get; set; }

    public Provider Provider { get; set; } // Navigation property

    [Required]
    [MaxLength(30)]
    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;

    [MaxLength(30)]
    [Column("middle_name")]
    public string MiddleName { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(30)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("birthday")]
    public DateTime Birthday { get; set; }

    [Required]
    [MaxLength(15)]
    [Phone]
    [Column("contact_number")]
    public string ContactNumber { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("address")]
    public string Address { get; set; } = string.Empty;

    [Required]
    [Column("gender")]
    public char Gender { get; set; } 

    [Required]
    [Range(0, int.MaxValue)] // Ensures non-negative values
    [Column("height")]
    public int Height { get; set; }

    [Required]
    [Range(0, int.MaxValue)] // Ensures non-negative values
    [Column("weight")]
    public int Weight { get; set; }

}
