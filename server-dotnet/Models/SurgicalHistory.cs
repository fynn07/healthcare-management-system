using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class SurgicalHistory
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
        [MaxLength(50)]
        [Column("operation_procedure")]
        public string OperationProcedure { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("indication")]
        public string Indication { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("hospital")]
        public string Hospital { get; set; } = string.Empty;

        [Required]
        [Column("operation_date")]
        public DateTime OperationDate { get; set; }
    }
}
