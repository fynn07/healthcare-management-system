using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class VaccinationHistory
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
        [Column("date_administered")]
        public DateTime DateAdministered { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("vaccine_name")]
        public string VaccineName { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("brand_name")]
        public string BrandName { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("provider")]
        public string Provider { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("site_given")]
        public string SiteGiven { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [Column("dose_ml")]
        public string DoseMl { get; set; } = string.Empty;

        [Required]
        [Column("next_dose_date")]
        public DateTime NextDoseDate { get; set; }
    }
}
