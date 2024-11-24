using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using server_dotnet.Models;
using PostgreSQL.Data;
using System.Threading.Tasks;

namespace server_dotnet.Services
{
    public class TokenService
    {
        private readonly ApplicationDBContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenService(ApplicationDBContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // Helper method for token-based authentication
        public async Task<Token> GetTokenFromHeader()
        {
            var tokenValue = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Token ", "");

            if (string.IsNullOrEmpty(tokenValue))
            {
                return null; // Or handle missing token differently
            }

            var token = await _context.Tokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Value == tokenValue);

            return token;
        }
    }
}
