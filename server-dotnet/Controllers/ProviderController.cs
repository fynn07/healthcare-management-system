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
    public class ProviderController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;

        public ProviderController(ApplicationDBContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // POST: api/Provider/setup
        [HttpPost("setup-provider")]
        [Authorize]  // This ensures that the user is authenticated
        public async Task<IActionResult> SetupProvider([FromBody] SetupProviderRequest request)
        {
            // Extract the token and the associated user
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var user = token.User;

            // Check if the provider already exists for this user
            if (await _context.Providers.AnyAsync(p => p.UserId == user.Id))
            {
                return BadRequest(new { error = "This account already has a provider." });
            }

            var provider = new Provider
            {
                UserId = user.Id,
                Name = request.Name,
                ProviderType = request.ProviderType,
                ProviderLocation = request.ProviderLocation
            };

            _context.Providers.Add(provider);
            await _context.SaveChangesAsync();

            // Serialize the provider data and return it
            var providerData = new
            {
                id = provider.Id,
                name = provider.Name,
                provider_type = provider.ProviderType,
                provider_locaation = provider.ProviderLocation,
                account = provider.UserId
            };

            return CreatedAtAction(nameof(SetupProvider), new { id = provider.Id }, providerData);
        }

        // GET: api/Provider/fetch
        [HttpGet("fetch-provider")]
        [Authorize]  // This ensures that the user is authenticated
        public async Task<IActionResult> FetchProvider()
        {
            // Extract the token and the associated user
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            var user = token.User;

            // Try to get the provider associated with the user
            var provider = await _context.Providers
                .FirstOrDefaultAsync(p => p.UserId == user.Id);

            if (provider == null)
            {
                return NotFound(new { error = "Provider not found for this account." });
            }

            // Serialize the provider data and return it
            var providerData = new
            {
                id = provider.Id,
                name = provider.Name,
                provider_type = provider.ProviderType,
                provider_location = provider.ProviderLocation,
                account = provider.UserId
            };

            return Ok(providerData);
        }
    }

    // DTO for SetupProvider request body
    public class SetupProviderRequest
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string ProviderType { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ProviderLocation { get; set; } = string.Empty;
    }
}
