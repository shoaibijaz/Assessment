using Assessment.Domain;
using Assessment.DTOs;
using Assessment.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, TokenService tokenService,
            IConfiguration config)
        {
            _config = config;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }

            return Unauthorized("Invalid password");
        }

        [Authorize]
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            var user = new AppUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                City = registerDto.City,
                State = registerDto.State,
                Gender = registerDto.Gender,
                StudentStatus = registerDto.StudentStatus,
                Major = registerDto.Major,
                Country = registerDto.Country,
                Age = registerDto.Age,
                SAT = registerDto.SAT,
                Grade = registerDto.Grade,
                Height = registerDto.Height,
                Email = registerDto.Email,
                UserName = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Problem registering user");

            return Ok("Registration success");
        }

        [Authorize]
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Update(string id, UpdateDto registerDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user.Email != registerDto.Email && await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }


            user.FirstName = registerDto.FirstName;
            user.LastName = registerDto.LastName;
            user.City = registerDto.City;
            user.State = registerDto.State;
            user.Gender = registerDto.Gender;
            user.StudentStatus = registerDto.StudentStatus;
            user.Major = registerDto.Major;
            user.Country = registerDto.Country;
            user.Age = registerDto.Age;
            user.SAT = registerDto.SAT;
            user.Grade = registerDto.Grade;
            user.Height = registerDto.Height;
            user.Email = registerDto.Email;
            user.UserName = registerDto.Email;

            var result = await _userManager.UpdateAsync(user);

            if(!string.IsNullOrEmpty(registerDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
               await _userManager.ResetPasswordAsync(user, token, registerDto.Password);
            }

            if (!result.Succeeded) return BadRequest("Problem updating user");

            return Ok("Update success");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.Users
                .Include(r => r.RefreshTokens)
                .FirstOrDefaultAsync(x => x.Id == id);

            await _userManager.DeleteAsync(user);

            return Ok("User has been delete");
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            users.Reverse();
            return Ok(users);
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.FirstName + " " + user.LastName,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}
