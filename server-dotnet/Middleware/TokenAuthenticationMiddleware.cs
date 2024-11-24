using Microsoft.EntityFrameworkCore;
using PostgreSQL.Data;

public class TokenAuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ApplicationDBContext _context;

    public TokenAuthenticationMiddleware(RequestDelegate next, ApplicationDBContext context)
    {
        _next = next;
        _context = context;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var tokenValue = context.Request.Headers["Authorization"].ToString().Replace("Token ", "");
        var token = await _context.Tokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Value == tokenValue);

        if (token != null)
        {
            context.Items["User"] = token.User;  // You can access the User here
        }

        await _next(context);
    }
}
