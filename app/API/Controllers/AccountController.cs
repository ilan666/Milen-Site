using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
    private readonly DataContext.DataContext _context;
    private readonly ITokenService _tokenService;

        public AccountController(DataContext.DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
             _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> register(RegisterDTO registerDTO)
        {
            using var hmac = new HMACSHA512();

            if(await UserExists(registerDTO.Email)) return BadRequest("User already exists");

            var user = new AppUser{
                UserName = registerDTO.Username,
                Email = registerDTO.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new UserDTO{
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email.ToLower() == loginDTO.Email.ToLower());

            if (user == null) return Unauthorized("Invalid Email");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDTO{
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }
    }
}