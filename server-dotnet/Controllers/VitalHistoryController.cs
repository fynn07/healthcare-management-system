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
    public class VitalHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;
        private readonly PaginationService _paginationService;

        public VitalHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/vital_history/create/{id}
        [HttpPost("patient/create/{id}/vital_history")]
        [Authorize]
        public async Task<IActionResult> CreateVitalHistoryRecord(int id, [FromBody] VitalHistoryRequest request)
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

            var vitalHistory = new VitalHistory
            {
                PatientId = patient.Id,
                Temperature = request.temperature,
                BloodPressure = request.blood_pressure,
                PulseRate = request.pulse_rate,
                BloodGlucose = request.blood_glucose,
                DateAdded = DateTime.UtcNow
            };

            _context.VitalHistory.Add(vitalHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateVitalHistoryRecord), new { id = vitalHistory.Id }, new
            {
                id = vitalHistory.Id,
                patient_id = vitalHistory.PatientId,
                temperature = vitalHistory.Temperature,
                blood_pressure = vitalHistory.BloodPressure,
                pulse_rate = vitalHistory.PulseRate,
                blood_glucose = vitalHistory.BloodGlucose,
                date_added = vitalHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/vital_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/vital_history")]
        [Authorize]
        public async Task<IActionResult> FetchVitalHistoryRecords(int id, int page = 1)
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

            var vitalHistory = await _context.VitalHistory
                .Where(vh => vh.PatientId == patient.Id)
                .ToListAsync();

            var response = vitalHistory.Select(vh => new
            {
                id = vh.Id,
                patient_id = vh.PatientId,
                temperature = vh.Temperature,
                blood_pressure = vh.BloodPressure,
                pulse_rate = vh.PulseRate,
                blood_glucose = vh.BloodGlucose,
                date_added = vh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/vital_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/vital_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleVitalHistoryRecord(int id, int record_id)
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

            var vitalHistory = await _context.VitalHistory
                .FirstOrDefaultAsync(vh => vh.Id == record_id && vh.PatientId == patient.Id);

            if (vitalHistory == null)
            {
                return NotFound(new { error = "Vital history record not found." });
            }

            var response = new
            {
                id = vitalHistory.Id,
                patient_id = vitalHistory.PatientId,
                temperature = vitalHistory.Temperature,
                blood_pressure = vitalHistory.BloodPressure,
                pulse_rate = vitalHistory.PulseRate,
                blood_glucose = vitalHistory.BloodGlucose,
                date_added = vitalHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/vital_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/vital_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVitalHistoryRecord(int id, int record_id, [FromBody] VitalHistoryRequest request)
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

            var vitalHistory = await _context.VitalHistory
                .FirstOrDefaultAsync(vh => vh.Id == record_id && vh.PatientId == patient.Id);

            if (vitalHistory == null)
            {
                return NotFound(new { error = "Vital history record not found." });
            }

            vitalHistory.Temperature = request.temperature;
            vitalHistory.BloodPressure = request.blood_pressure;
            vitalHistory.PulseRate = request.pulse_rate;
            vitalHistory.BloodGlucose = request.blood_glucose;

            _context.VitalHistory.Update(vitalHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = vitalHistory.Id,
                patient_id = vitalHistory.PatientId,
                temperature = vitalHistory.Temperature,
                blood_pressure = vitalHistory.BloodPressure,
                pulse_rate = vitalHistory.PulseRate,
                blood_glucose = vitalHistory.BloodGlucose,
                date_added = vitalHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for VitalHistory request body
    public class VitalHistoryRequest
    {
        [Required]
        [MaxLength(20)]
        public string temperature { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string blood_pressure { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string pulse_rate { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string blood_glucose { get; set; } = string.Empty;
    }
}
