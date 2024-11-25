using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using server_dotnet.Models;
using System.Linq;
using System;
using PostgreSQL.Data;
using server_dotnet.Services;

namespace server_dotnet.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly TokenService _tokenService;

        public AuthController(ApplicationDBContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpGet("test_token")]
        public async Task<IActionResult> GetUserFromToken()
        {
            // Extract the token from the request header
            var token = await _tokenService.GetTokenFromHeader();

            if (token == null || token.User == null)
            {
                return Unauthorized(new { error = "Invalid or expired token." });
            }

            // Return the user associated with the token
            return Ok(new
            {
                user = new
                {
                    Id = token.User.Id,
                    Username = token.User.Username,
                    Email = token.User.Email
                }
            });
        }

        // POST: apiSignup
        [HttpPost("signup")]
        public async Task<IActionResult> UserSignup([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("User already exists.");
            }

            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Save the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create a token for the user
            var token = GenerateToken(user);

            return CreatedAtAction(nameof(UserSignup), new { token, user = user }, new { token, user });
        }

        // POST: api/Login
        [HttpPost("login")]
        public async Task<IActionResult> UserLogin([FromBody] LoginRequest loginRequest)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate and save a token
            var token = GenerateToken(user);

            // Create a token entry in the Token table
            _context.Tokens.Add(token);
            await _context.SaveChangesAsync();

            return Ok(new { token = token.Value, user });
        }

        // Helper method to generate token
        private Token GenerateToken(User user)
        {
            var tokenValue = Guid.NewGuid().ToString(); // You can use a more complex method if needed
            var token = new Token
            {
                Value = tokenValue,
                UserId = user.Id
            };

            return token;
        }
    }

    // Login Request DTO
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
