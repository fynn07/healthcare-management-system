using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class AllergyHistory
    {
        public int Id { get; set; } // Primary key

        // Foreign key to Patient model
        [Column("patient_id")]
        public int PatientId { get; set; }

        // Navigation property to Patient model
        public Patient Patient { get; set; }

        [Required]
        [Column("date_added")]
        public DateTime DateAdded { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("substance")]
        public string Substance { get; set; } = string.Empty;

        [Required]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("severity")]
        public string Severity { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("criticality")]
        public string Criticality { get; set; } = string.Empty;
    }
}
