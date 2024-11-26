using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using server_dotnet.Models;
using server_dotnet.Services;
using System.Threading.Tasks;
using PostgreSQL.Data;
using System.ComponentModel.DataAnnotations;
using YourNamespace;

namespace server_dotnet.Controllers
{
    [Route("api")]
    [ApiController]
    public class MedicationHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;

        private readonly PaginationService _paginationService;

        public MedicationHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/medication_history/create/{id}
        [HttpPost("patient/create/{id}/medication_history")]
        [Authorize]
        public async Task<IActionResult> CreateMedicationHistoryRecord(int id, [FromBody] MedicationHistoryRequest request)
        {
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var provider = await _context.Providers.FirstOrDefaultAsync(p => p.UserId == token.User.Id);

            if (provider == null)
            {
                return NotFound(new { error = "Provider not found for this account." });
            }

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id && p.ProviderId == provider.Id);

            if (patient == null)
            {
                return NotFound(new { error = "Patient not found." });
            }

            var medicationHistory = new MedicationHistory
            {
                PatientId = patient.Id,
                GenericName = request.generic_name,
                DatePrescribed = request.date_prescribed,
                Dosage = request.dosage,
                Quantity = request.quantity,
                Instructions = request.instructions,
                DateAdded = DateTime.UtcNow
            };

            _context.MedicationHistory.Add(medicationHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateMedicationHistoryRecord), new { id = medicationHistory.Id }, new
            {
                id = medicationHistory.Id,
                patient_id = medicationHistory.PatientId,
                generic_name = medicationHistory.GenericName,
                date_prescribed = medicationHistory.DatePrescribed.ToString("yyyy-MM-dd"),
                dosage = medicationHistory.Dosage,
                quantity = medicationHistory.Quantity,
                instructions = medicationHistory.Instructions,
                date_added = medicationHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/medication_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/medication_history")]
        [Authorize]
        public async Task<IActionResult> FetchMedicationHistoryRecords(int id, int page = 1)
        {
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var provider = await _context.Providers.FirstOrDefaultAsync(p => p.UserId == token.User.Id);

            if (provider == null)
            {
                return NotFound(new { error = "Provider not found for this account." });
            }

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id && p.ProviderId == provider.Id);

            if (patient == null)
            {
                return NotFound(new { error = "Patient not found." });
            }

            var medicationHistory = await _context.MedicationHistory
                .Where(mh => mh.PatientId == patient.Id)
                .ToListAsync();

            var response = medicationHistory.Select(mh => new
            {
                id = mh.Id,
                patient_id = mh.PatientId,
                generic_name = mh.GenericName,
                date_prescribed = mh.DatePrescribed.ToString("yyyy-MM-dd"),
                dosage = mh.Dosage,
                quantity = mh.Quantity,
                instructions = mh.Instructions,
                date_added = mh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/medication_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/medication_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleMedicationHistoryRecord(int id, int record_id)
        {
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var provider = await _context.Providers.FirstOrDefaultAsync(p => p.UserId == token.User.Id);

            if (provider == null)
            {
                return NotFound(new { error = "Provider not found for this account." });
            }

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id && p.ProviderId == provider.Id);

            if (patient == null)
            {
                return NotFound(new { error = "Patient not found." });
            }

            var medicationHistory = await _context.MedicationHistory
                .FirstOrDefaultAsync(mh => mh.Id == record_id && mh.PatientId == patient.Id);

            if (medicationHistory == null)
            {
                return NotFound(new { error = "Medication history record not found." });
            }

            var response = new
            {
                id = medicationHistory.Id,
                patient_id = medicationHistory.PatientId,
                generic_name = medicationHistory.GenericName,
                date_prescribed = medicationHistory.DatePrescribed.ToString("yyyy-MM-dd"),
                dosage = medicationHistory.Dosage,
                quantity = medicationHistory.Quantity,
                instructions = medicationHistory.Instructions,
                date_added = medicationHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/medication_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/medication_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateMedicationHistoryRecord(int id, int record_id, [FromBody] MedicationHistoryRequest request)
        {
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var provider = await _context.Providers.FirstOrDefaultAsync(p => p.UserId == token.User.Id);

            if (provider == null)
            {
                return NotFound(new { error = "Provider not found for this account." });
            }

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id && p.ProviderId == provider.Id);

            if (patient == null)
            {
                return NotFound(new { error = "Patient not found." });
            }

            var medicationHistory = await _context.MedicationHistory
                .FirstOrDefaultAsync(mh => mh.Id == record_id && mh.PatientId == patient.Id);

            if (medicationHistory == null)
            {
                return NotFound(new { error = "Medication history record not found." });
            }

            medicationHistory.GenericName = request.generic_name;
            medicationHistory.DatePrescribed = request.date_prescribed;
            medicationHistory.Dosage = request.dosage;
            medicationHistory.Quantity = request.quantity;
            medicationHistory.Instructions = request.instructions;

            _context.MedicationHistory.Update(medicationHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = medicationHistory.Id,
                patient_id = medicationHistory.PatientId,
                generic_name = medicationHistory.GenericName,
                date_prescribed = medicationHistory.DatePrescribed.ToString("yyyy-MM-dd"),
                dosage = medicationHistory.Dosage,
                quantity = medicationHistory.Quantity,
                instructions = medicationHistory.Instructions,
                date_added = medicationHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for MedicationHistory request body
    public class MedicationHistoryRequest
    {
        [Required]
        [MaxLength(100)]
        public string generic_name { get; set; } = string.Empty;

        [Required]
        public DateTime date_prescribed { get; set; }

        [Required]
        public string dosage { get; set; } = string.Empty;

        [Required]
        public int quantity { get; set; }

        [Required]
        public string instructions { get; set; } = string.Empty;
    }
}
