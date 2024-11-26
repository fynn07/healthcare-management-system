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
    public class FamilyHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;
        private readonly PaginationService _paginationService;

        public FamilyHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/family_history/create/{id}
        [HttpPost("patient/create/{id}/family_history")]
        [Authorize]
        public async Task<IActionResult> CreateFamilyHistoryRecord(int id, [FromBody] FamilyHistoryRequest request)
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

            var familyHistory = new FamilyHistory
            {
                PatientId = patient.Id,
                DateAdded = DateTime.UtcNow,
                Relationship = request.relationship,
                ConditionIllness = request.condition_illness
            };

            _context.FamilyHistory.Add(familyHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateFamilyHistoryRecord), new { id = familyHistory.Id }, new
            {
                id = familyHistory.Id,
                patient_id = familyHistory.PatientId,
                relationship = familyHistory.Relationship,
                condition_illness = familyHistory.ConditionIllness,
                date_added = familyHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/family_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/family_history")]
        [Authorize]
        public async Task<IActionResult> FetchFamilyHistoryRecords(int id, int page = 1)
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

            var familyHistory = await _context.FamilyHistory
                .Where(fh => fh.PatientId == patient.Id)
                .ToListAsync();

            var response = familyHistory.Select(fh => new
            {
                id = fh.Id,
                patient_id = fh.PatientId,
                relationship = fh.Relationship,
                condition_illness = fh.ConditionIllness,
                date_added = fh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/family_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/family_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleFamilyHistoryRecord(int id, int record_id)
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

            var familyHistory = await _context.FamilyHistory
                .FirstOrDefaultAsync(fh => fh.Id == record_id && fh.PatientId == patient.Id);

            if (familyHistory == null)
            {
                return NotFound(new { error = "Family history record not found." });
            }

            var response = new
            {
                id = familyHistory.Id,
                patient_id = familyHistory.PatientId,
                relationship = familyHistory.Relationship,
                condition_illness = familyHistory.ConditionIllness,
                date_added = familyHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/family_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/family_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateFamilyHistoryRecord(int id, int record_id, [FromBody] FamilyHistoryRequest request)
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

            var familyHistory = await _context.FamilyHistory
                .FirstOrDefaultAsync(fh => fh.Id == record_id && fh.PatientId == patient.Id);

            if (familyHistory == null)
            {
                return NotFound(new { error = "Family history record not found." });
            }

            familyHistory.Relationship = request.relationship;
            familyHistory.ConditionIllness = request.condition_illness;

            _context.FamilyHistory.Update(familyHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = familyHistory.Id,
                patient_id = familyHistory.PatientId,
                relationship = familyHistory.Relationship,
                condition_illness = familyHistory.ConditionIllness,
                date_added = familyHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for FamilyHistory request body
    public class FamilyHistoryRequest
    {
        [Required]
        [MaxLength(30)]
        public string relationship { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string condition_illness { get; set; } = string.Empty;
    }
}
