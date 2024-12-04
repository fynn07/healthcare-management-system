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
    public class AllergyHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;
        private readonly PaginationService _paginationService;

        public AllergyHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/allergy_history/create/{id}
        [HttpPost("patient/create/{id}/allergy_history")]
        [Authorize]
        public async Task<IActionResult> CreateAllergyHistoryRecord(int id, [FromBody] AllergyHistoryRequest request)
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

            var allergyHistory = new AllergyHistory
            {
                PatientId = patient.Id,
                Substance = request.substance,
                Description = request.description,
                Severity = request.severity,
                Criticality = request.criticality,
                DateAdded = DateTime.UtcNow
            };

            _context.AllergyHistory.Add(allergyHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateAllergyHistoryRecord), new { id = allergyHistory.Id }, new
            {
                id = allergyHistory.Id,
                patient_id = allergyHistory.PatientId,
                substance = allergyHistory.Substance,
                description = allergyHistory.Description,
                severity = allergyHistory.Severity,
                criticality = allergyHistory.Criticality,
                date_added = allergyHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/allergy_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/allergy_history")]
        [Authorize]
        public async Task<IActionResult> FetchAllergyHistoryRecords(int id, int page = 1)
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

            var allergyHistory = await _context.AllergyHistory
                .Where(ah => ah.PatientId == patient.Id)
                .ToListAsync();

            var response = allergyHistory.Select(ah => new
            {
                id = ah.Id,
                patient_id = ah.PatientId,
                substance = ah.Substance,
                description = ah.Description,
                severity = ah.Severity,
                criticality = ah.Criticality,
                date_added = ah.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/allergy_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/allergy_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleAllergyHistoryRecord(int id, int record_id)
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

            var allergyHistory = await _context.AllergyHistory
                .FirstOrDefaultAsync(ah => ah.Id == record_id && ah.PatientId == patient.Id);

            if (allergyHistory == null)
            {
                return NotFound(new { error = "Allergy history record not found." });
            }

            var response = new
            {
                id = allergyHistory.Id,
                patient_id = allergyHistory.PatientId,
                substance = allergyHistory.Substance,
                description = allergyHistory.Description,
                severity = allergyHistory.Severity,
                criticality = allergyHistory.Criticality,
                date_added = allergyHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/allergy_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/allergy_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAllergyHistoryRecord(int id, int record_id, [FromBody] AllergyHistoryRequest request)
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

            var allergyHistory = await _context.AllergyHistory
                .FirstOrDefaultAsync(ah => ah.Id == record_id && ah.PatientId == patient.Id);

            if (allergyHistory == null)
            {
                return NotFound(new { error = "Allergy history record not found." });
            }

            allergyHistory.Substance = request.substance;
            allergyHistory.Description = request.description;
            allergyHistory.Severity = request.severity;
            allergyHistory.Criticality = request.criticality;

            _context.AllergyHistory.Update(allergyHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = allergyHistory.Id,
                patient_id = allergyHistory.PatientId,
                substance = allergyHistory.Substance,
                description = allergyHistory.Description,
                severity = allergyHistory.Severity,
                criticality = allergyHistory.Criticality,
                date_added = allergyHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for AllergyHistory request body
    public class AllergyHistoryRequest
    {
        [Required]
        [MaxLength(30)]
        public string substance { get; set; } = string.Empty;

        [Required]
        public string description { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string severity { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string criticality { get; set; } = string.Empty;
    }
}
