using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class SocialHistory
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

        [MaxLength(50)]
        [Column("nicotine_consumption")]
        public string NicotineConsumption { get; set; } = string.Empty;

        [MaxLength(50)]
        [Column("alcohol_consumption")]
        public string AlcoholConsumption { get; set; } = string.Empty;

        [MaxLength(30)]
        [Column("drugs_taken")]
        public string DrugsTaken { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("diet")]
        public string Diet { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("physical_activity")]
        public string PhysicalActivity { get; set; } = string.Empty;
    }
}
