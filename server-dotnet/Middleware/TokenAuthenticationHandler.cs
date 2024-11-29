using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using server_dotnet.Services;
using System.Text.Encodings.Web;

public class TokenAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly TokenService _tokenService;

    public TokenAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options, 
        ILoggerFactory logger, 
        UrlEncoder encoder, 
        ISystemClock clock,
        TokenService tokenService)
        : base(options, logger, encoder, clock)
    {
        _tokenService = tokenService;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        // Check if the Authorization header exists
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.NoResult();
        }

        // Extract token from Authorization header
        var token = Request.Headers["Authorization"].ToString().Replace("Token ", "");
        if (string.IsNullOrEmpty(token))
        {
            return AuthenticateResult.Fail("Invalid token.");
        }

        // Validate token using TokenService
        var user = await _tokenService.ValidateTokenAsync(token);
        if (user == null)
        {
            return AuthenticateResult.Fail("Invalid or expired token.");
        }

        // If token is valid, create a GenericIdentity and set it in a GenericPrincipal
        var identity = new GenericIdentity(user.Username);
        var principal = new GenericPrincipal(identity, null); // No roles here, can be added if needed

        // Attach the user info to the HttpContext so it's available throughout the request
        Context.User = principal;

        // Return success with the AuthenticationTicket
        return AuthenticateResult.Success(new AuthenticationTicket(principal, "Token"));
    }
}
