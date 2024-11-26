using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class VitalHistory
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
        [MaxLength(20)]
        [Column("temperature")]
        public string Temperature { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("blood_pressure")]
        public string BloodPressure { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("pulse_rate")]
        public string PulseRate { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("blood_glucose")]
        public string BloodGlucose { get; set; } = string.Empty;
    }
}
