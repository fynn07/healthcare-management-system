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
    public class SurgicalHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;

        private readonly PaginationService _paginationService;

        public SurgicalHistoryController(ApplicationDBContext context, TokenService tokenService, PaginationService paginationService)
        {
            _context = context;
            _tokenService = tokenService;
            _paginationService = paginationService;
        }

        // POST: api/surgical_history/create/{id}
        [HttpPost("patient/create/{id}/surgical_history")]
        [Authorize]
        public async Task<IActionResult> CreateSurgicalHistoryRecord(int id, [FromBody] SurgicalHistoryRequest request)
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

            var surgicalHistory = new SurgicalHistory
            {
                PatientId = patient.Id,
                OperationProcedure = request.operation_procedure,
                Indication = request.indication,
                Hospital = request.hospital,
                OperationDate = request.operation_date,
                DateAdded = DateTime.UtcNow
            };

            _context.SurgicalHistory.Add(surgicalHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateSurgicalHistoryRecord), new { id = surgicalHistory.Id }, new
            {
                id = surgicalHistory.Id,
                patient_id = surgicalHistory.PatientId,
                operation_procedure = surgicalHistory.OperationProcedure,
                indication = surgicalHistory.Indication,
                hospital = surgicalHistory.Hospital,
                operation_date = surgicalHistory.OperationDate.ToString("yyyy-MM-dd"),
                date_added = surgicalHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }

        // GET: api/surgical_history/fetch/{id}
        [HttpGet("patient/fetch/{id}/surgical_history")]
        [Authorize]
        public async Task<IActionResult> FetchSurgicalHistoryRecords(int id, int page = 1)
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

            var surgicalHistory = await _context.SurgicalHistory
                .Where(sh => sh.PatientId == patient.Id)
                .ToListAsync();

            var response = surgicalHistory.Select(sh => new
            {
                id = sh.Id,
                patient_id = sh.PatientId,
                operation_procedure = sh.OperationProcedure,
                indication = sh.Indication,
                hospital = sh.Hospital,
                operation_date = sh.OperationDate.ToString("yyyy-MM-dd"),
                date_added = sh.DateAdded.ToString("yyyy-MM-dd")
            }).ToList();

            var paginatedResponse = _paginationService.GetPaginatedResponse(response, page);

            return Ok(paginatedResponse);
        }

        // GET: api/surgical_history/fetch_single/{id}/{record_id}
        [HttpGet("patient/fetch/{id}/surgical_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> FetchSingleSurgicalHistoryRecord(int id, int record_id)
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

            var surgicalHistory = await _context.SurgicalHistory
                .FirstOrDefaultAsync(sh => sh.Id == record_id && sh.PatientId == patient.Id);

            if (surgicalHistory == null)
            {
                return NotFound(new { error = "Surgical history record not found." });
            }

            var response = new
            {
                id = surgicalHistory.Id,
                patient_id = surgicalHistory.PatientId,
                operation_procedure = surgicalHistory.OperationProcedure,
                indication = surgicalHistory.Indication,
                hospital = surgicalHistory.Hospital,
                operation_date = surgicalHistory.OperationDate.ToString("yyyy-MM-dd"),
                date_added = surgicalHistory.DateAdded.ToString("yyyy-MM-dd")
            };

            return Ok(response);
        }

        // PUT: api/surgical_history/update/{id}/{record_id}
        [HttpPut("patient/update/{id}/surgical_history/{record_id}")]
        [Authorize]
        public async Task<IActionResult> UpdateSurgicalHistoryRecord(int id, int record_id, [FromBody] SurgicalHistoryRequest request)
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

            var surgicalHistory = await _context.SurgicalHistory
                .FirstOrDefaultAsync(sh => sh.Id == record_id && sh.PatientId == patient.Id);

            if (surgicalHistory == null)
            {
                return NotFound(new { error = "Surgical history record not found." });
            }

            surgicalHistory.OperationProcedure = request.operation_procedure;
            surgicalHistory.Indication = request.indication;
            surgicalHistory.Hospital = request.hospital;
            surgicalHistory.OperationDate = request.operation_date;

            _context.SurgicalHistory.Update(surgicalHistory);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = surgicalHistory.Id,
                patient_id = surgicalHistory.PatientId,
                operation_procedure = surgicalHistory.OperationProcedure,
                indication = surgicalHistory.Indication,
                hospital = surgicalHistory.Hospital,
                operation_date = surgicalHistory.OperationDate.ToString("yyyy-MM-dd"),
                date_added = surgicalHistory.DateAdded.ToString("yyyy-MM-dd")
            });
        }
    }

    // DTO for SurgicalHistory request body
    public class SurgicalHistoryRequest
    {
        [Required]
        [MaxLength(50)]
        public string operation_procedure { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string indication { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string hospital { get; set; } = string.Empty;

        [Required]
        public DateTime operation_date { get; set; }
    }
}
