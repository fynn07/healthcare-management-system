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
    public class SocialHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;
        private readonly PaginationService _paginationService;

        public SocialHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/social_history/create/{id}
        [HttpPost("patient/create/{id}/social_history")]
        [Authorize]
        public async Task<IActionResult> CreateSocialHistoryRecord(int id, [FromBody] SocialHistoryRequest request)
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

            var socialHistory = new SocialHistory
            {
                PatientId = patient.Id,
                NicotineConsumption = request.nicotine_consumption,
                AlcoholConsumption = request.alcohol_consumption,
                DrugsTaken = request.drugs_taken,
                Diet = request.diet,
                PhysicalActivity = request.physical_activity,
                DateAdded = DateTime.UtcNow
            };

            _context.SocialHistory.Add(socialHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateSocialHistoryRecord), new { id = socialHistory.Id }, new
            {
                id = socialHistory.Id,
                patient_id = socialHistory.PatientId,
                nicotine_consumption = socialHistory.NicotineConsumption,
                alcohol_consumption = socialHistory.AlcoholConsumption,
                drugs_taken = socialHistory.DrugsTaken,
                diet = socialHistory.Diet,
                physical_activity = socialHistory.PhysicalActivity,
                date_added = socialHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/social_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/social_history")]
        [Authorize]
        public async Task<IActionResult> FetchSocialHistoryRecords(int id, int page = 1)
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

            var socialHistory = await _context.SocialHistory
                .Where(sh => sh.PatientId == patient.Id)
                .ToListAsync();

            var response = socialHistory.Select(sh => new
            {
                id = sh.Id,
                patient_id = sh.PatientId,
                nicotine_consumption = sh.NicotineConsumption,
                alcohol_consumption = sh.AlcoholConsumption,
                drugs_taken = sh.DrugsTaken,
                diet = sh.Diet,
                physical_activity = sh.PhysicalActivity,
                date_added = sh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/social_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/social_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleSocialHistoryRecord(int id, int record_id)
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

            var socialHistory = await _context.SocialHistory
                .FirstOrDefaultAsync(sh => sh.Id == record_id && sh.PatientId == patient.Id);

            if (socialHistory == null)
            {
                return NotFound(new { error = "Social history record not found." });
            }

            var response = new
            {
                id = socialHistory.Id,
                patient_id = socialHistory.PatientId,
                nicotine_consumption = socialHistory.NicotineConsumption,
                alcohol_consumption = socialHistory.AlcoholConsumption,
                drugs_taken = socialHistory.DrugsTaken,
                diet = socialHistory.Diet,
                physical_activity = socialHistory.PhysicalActivity,
                date_added = socialHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/social_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/social_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateSocialHistoryRecord(int id, int record_id, [FromBody] SocialHistoryRequest request)
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

            var socialHistory = await _context.SocialHistory
                .FirstOrDefaultAsync(sh => sh.Id == record_id && sh.PatientId == patient.Id);

            if (socialHistory == null)
            {
                return NotFound(new { error = "Social history record not found." });
            }

            socialHistory.NicotineConsumption = request.nicotine_consumption;
            socialHistory.AlcoholConsumption = request.alcohol_consumption;
            socialHistory.DrugsTaken = request.drugs_taken;
            socialHistory.Diet = request.diet;
            socialHistory.PhysicalActivity = request.physical_activity;

            _context.SocialHistory.Update(socialHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = socialHistory.Id,
                patient_id = socialHistory.PatientId,
                nicotine_consumption = socialHistory.NicotineConsumption,
                alcohol_consumption = socialHistory.AlcoholConsumption,
                drugs_taken = socialHistory.DrugsTaken,
                diet = socialHistory.Diet,
                physical_activity = socialHistory.PhysicalActivity,
                date_added = socialHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for SocialHistory request body
    public class SocialHistoryRequest
    {
        [MaxLength(50)]
        public string nicotine_consumption { get; set; } = string.Empty;

        [MaxLength(50)]
        public string alcohol_consumption { get; set; } = string.Empty;

        [MaxLength(30)]
        public string drugs_taken { get; set; } = string.Empty;

        [MaxLength(100)]
        public string diet { get; set; } = string.Empty;

        [MaxLength(100)]
        public string physical_activity { get; set; } = string.Empty;
    }
}
