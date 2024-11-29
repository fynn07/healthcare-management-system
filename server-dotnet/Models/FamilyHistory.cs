using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class FamilyHistory
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
        [Column("relationship")]
        public string Relationship { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("condition_illness")]
        public string ConditionIllness { get; set; } = string.Empty;
    }
}
