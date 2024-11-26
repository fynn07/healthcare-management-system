using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class MedicationHistory
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
        [Column("date_prescribed")]
        public DateTime DatePrescribed { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("generic_name")]
        public string GenericName { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("dosage")]
        public string Dosage { get; set; } = string.Empty;

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [MaxLength(500)] // Assuming a reasonable max length for instructions
        [Column("instructions")]
        public string Instructions { get; set; } = string.Empty;
    }
}
