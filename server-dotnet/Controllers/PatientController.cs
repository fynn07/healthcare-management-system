using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using server_dotnet.Models;
using server_dotnet.Services;
using System.Threading.Tasks;
using PostgreSQL.Data;
using System.ComponentModel.DataAnnotations;

namespace server_dotnet.Controllers
{
    [Route("api")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;

        public PatientController(ApplicationDBContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // POST: api/patients/create
        [HttpPost("patients/create")]
        [Authorize]
        public async Task<IActionResult> CreatePatient([FromBody] PatientRequest request)
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

            var patient = new Patient
            {
                ProviderId = provider.Id,
                FirstName = request.first_name,
                MiddleName = request.middle_name,
                LastName = request.last_name,
                Email = request.email,
                Birthday = request.birthday,
                ContactNumber = request.contact_number,
                Address = request.address,
                Gender = request.gender,
                Height = request.height,
                Weight = request.weight
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreatePatient), new { id = patient.Id }, patient);
        }

        // GET: api/patients/{id}
        [HttpGet("patients/{id}")]
        [Authorize]
        public async Task<IActionResult> FetchSinglePatient(int id)
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

            var patientData = new
            {
                id = patient.Id,
                first_name = patient.FirstName,
                middle_name = patient.MiddleName,
                last_name = patient.LastName,
                email = patient.Email,
                birthday = patient.Birthday.ToString("yyyy-MM-dd"),
                contact_number = patient.ContactNumber,
                address = patient.Address,
                gender = patient.Gender,
                height = patient.Height,
                weight = patient.Weight
            };

            return Ok(patientData);
        }

        // GET: api/patients
        [HttpGet("patients")]
        [Authorize]
        public async Task<IActionResult> FetchPatients()
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

            var patients = await _context.Patients
                .Where(p => p.ProviderId == provider.Id)
                .ToListAsync();

            var patientsData = patients.Select(patient => new
                {
                    id = patient.Id,
                    first_name = patient.FirstName,
                    middle_name = patient.MiddleName,
                    last_name = patient.LastName,
                    email = patient.Email,
                    birthday = patient.Birthday.ToString("yyyy-MM-dd"),
                    contact_number = patient.ContactNumber,
                    address = patient.Address,
                    gender = patient.Gender,
                    height = patient.Height,
                    weight = patient.Weight
                }).ToList();

            return Ok(patientsData);
        }
    }

    // DTO for Patient request body
    public class PatientRequest
    {
        [Required]
        [MaxLength(30)]
        public string first_name { get; set; } = string.Empty;

        [MaxLength(30)]
        public string middle_name { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string last_name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;

        [Required]
        public DateTime birthday { get; set; }

        [Required]
        [MaxLength(15)]
        public string contact_number { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string address { get; set; } = string.Empty;

        [Required]
        public char gender { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int height { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int weight { get; set; }
    }
}
