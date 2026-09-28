using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopSphere.API.DTOs;
using ShopSphere.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext appDbContext, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var existingUser = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if(existingUser != null)
            {
                return BadRequest("Email already exists");
            }

            var user = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Role = "Customer"
            };

            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                registerDto.Password
                );

            await _appDbContext.Users.AddAsync(user);
            await _appDbContext.SaveChangesAsync();
            return Ok("Registration successful");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if(user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                loginDto.Password
                );

            if(result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid email or password");
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful",
                token = token,
                userId = user.Id,
                name = user.Name,
                email = user.Email,
                role = user.Role
            });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()
                    ),

                new Claim(
                    ClaimTypes.Name,
                    user.Name
                    ),
                new Claim(
                    ClaimTypes.Email,
                    user.Email
                    ),
                new Claim(
                    ClaimTypes.Role,
                    user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                    )
                );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("CreateAdmin")]
        public async Task<IActionResult> CreateAdmin(RegisterDto registerDto)
        {
            var existinguser = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if(existinguser != null)
            {
                return BadRequest("Email already exists");
            }

            var admin = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Role = "Admin"
            };

            admin.PasswordHash = _passwordHasher.HashPassword(
                admin,
                registerDto.Password
                );

            await _appDbContext.Users.AddAsync(admin);
            await _appDbContext.SaveChangesAsync();
            return Ok("Admin created Successfully");
        }
    } 
}
