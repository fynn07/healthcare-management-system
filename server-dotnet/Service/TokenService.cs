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
        public async Task<User> ValidateTokenAsync(string tokenValue)
        {
            if (string.IsNullOrEmpty(tokenValue))
            {
                return null; // Or handle missing token differently
            }

            // Fetch the token and its associated user from the database
            var token = await _context.Tokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Value == tokenValue);

            // If no token found or token is invalid, return null
            if (token == null || token.User == null)
            {
                return null;
            }

            // Return the associated user if token is valid
            return token.User;
        }

        // Optionally, you can have a method to fetch the token directly
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
