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
    public class VaccinationHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;
        private readonly PaginationService _paginationService;

        public VaccinationHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/vaccination_history/create/{id}
        [HttpPost("patient/create/{id}/vaccination_history")]
        [Authorize]
        public async Task<IActionResult> CreateVaccinationHistoryRecord(int id, [FromBody] VaccinationHistoryRequest request)
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

            var vaccinationHistory = new VaccinationHistory
            {
                PatientId = patient.Id,
                VaccineName = request.vaccine_name,
                BrandName = request.brand_name,
                Provider = request.provider,
                SiteGiven = request.site_given,
                DoseMl = request.dose_ml,
                DateAdministered = request.date_administered,
                NextDoseDate = request.next_dose_date,
                DateAdded = DateTime.UtcNow
            };

            _context.VaccinationHistory.Add(vaccinationHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateVaccinationHistoryRecord), new { id = vaccinationHistory.Id }, new
            {
                id = vaccinationHistory.Id,
                patient_id = vaccinationHistory.PatientId,
                vaccine_name = vaccinationHistory.VaccineName,
                brand_name = vaccinationHistory.BrandName,
                provider = vaccinationHistory.Provider,
                site_given = vaccinationHistory.SiteGiven,
                dose_ml = vaccinationHistory.DoseMl,
                date_administered = vaccinationHistory.DateAdministered.ToString("yyyy-MM-dd"),
                next_dose_date = vaccinationHistory.NextDoseDate.ToString("yyyy-MM-dd"),
                date_added = vaccinationHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/vaccination_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/vaccination_history")]
        [Authorize]
        public async Task<IActionResult> FetchVaccinationHistoryRecords(int id, int page = 1)
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

            var vaccinationHistory = await _context.VaccinationHistory
                .Where(vh => vh.PatientId == patient.Id)
                .ToListAsync();

            var response = vaccinationHistory.Select(vh => new
            {
                id = vh.Id,
                patient_id = vh.PatientId,
                vaccine_name = vh.VaccineName,
                brand_name = vh.BrandName,
                provider = vh.Provider,
                site_given = vh.SiteGiven,
                dose_ml = vh.DoseMl,
                date_administered = vh.DateAdministered.ToString("yyyy-MM-dd"),
                next_dose_date = vh.NextDoseDate.ToString("yyyy-MM-dd"),
                date_added = vh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/vaccination_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/vaccination_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleVaccinationHistoryRecord(int id, int record_id)
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

            var vaccinationHistory = await _context.VaccinationHistory
                .FirstOrDefaultAsync(vh => vh.Id == record_id && vh.PatientId == patient.Id);

            if (vaccinationHistory == null)
            {
                return NotFound(new { error = "Vaccination history record not found." });
            }

            var response = new
            {
                id = vaccinationHistory.Id,
                patient_id = vaccinationHistory.PatientId,
                vaccine_name = vaccinationHistory.VaccineName,
                brand_name = vaccinationHistory.BrandName,
                provider = vaccinationHistory.Provider,
                site_given = vaccinationHistory.SiteGiven,
                dose_ml = vaccinationHistory.DoseMl,
                date_administered = vaccinationHistory.DateAdministered.ToString("yyyy-MM-dd"),
                next_dose_date = vaccinationHistory.NextDoseDate.ToString("yyyy-MM-dd"),
                date_added = vaccinationHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/vaccination_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/vaccination_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVaccinationHistoryRecord(int id, int record_id, [FromBody] VaccinationHistoryRequest request)
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

            var vaccinationHistory = await _context.VaccinationHistory
                .FirstOrDefaultAsync(vh => vh.Id == record_id && vh.PatientId == patient.Id);

            if (vaccinationHistory == null)
            {
                return NotFound(new { error = "Vaccination history record not found." });
            }

            vaccinationHistory.DateAdministered = request.date_administered;
            vaccinationHistory.VaccineName = request.vaccine_name;
            vaccinationHistory.BrandName = request.brand_name;
            vaccinationHistory.Provider = request.provider;
            vaccinationHistory.SiteGiven = request.site_given;
            vaccinationHistory.DoseMl = request.dose_ml;
            vaccinationHistory.NextDoseDate = request.next_dose_date;

            _context.VaccinationHistory.Update(vaccinationHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = vaccinationHistory.Id,
                patient_id = vaccinationHistory.PatientId,
                date_administered = vaccinationHistory.DateAdministered.ToString("yyyy-MM-dd"),
                vaccine_name = vaccinationHistory.VaccineName,
                brand_name = vaccinationHistory.BrandName,
                provider = vaccinationHistory.Provider,
                site_given = vaccinationHistory.SiteGiven,
                dose_ml = vaccinationHistory.DoseMl,
                next_dose_date = vaccinationHistory.NextDoseDate.ToString("yyyy-MM-dd"),
                date_added = vaccinationHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

    }

    // DTO for VaccinationHistory request body
    public class VaccinationHistoryRequest
    {
        [Required]
        [MaxLength(30)]
        public string vaccine_name { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string brand_name { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string provider { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string site_given { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string dose_ml { get; set; } = string.Empty;

        [Required]
        public DateTime date_administered { get; set; }

        [Required]
        public DateTime next_dose_date { get; set; }
    }
}
