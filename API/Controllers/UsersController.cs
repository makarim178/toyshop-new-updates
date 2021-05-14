using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IContactDetailRepository _cdRepository;
        public UsersController(IUserRepository userRepository, IContactDetailRepository cdRepository, IMapper mapper)
        {
            _cdRepository = cdRepository;
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpPut("user")]
        public async Task<ActionResult> UpdateUser(UserUpdateRecData userUpdateRecData)
        {
            ContactDetail contactDetail = userUpdateRecData.ContactDetail;
            var user = await _userRepository.GetUserByUsername(userUpdateRecData.UserName);
            UserUpdateDto userDto = new UserUpdateDto
                {
                    FirstName = userUpdateRecData.FirstName,
                    LastName = userUpdateRecData.LastName,
                    DateOfBirth = userUpdateRecData.DateOfBirth,
                    ContactDetailId = userUpdateRecData.ContactDetail.Id,
                    LastActive = DateTime.Now
                };    
                
            if(contactDetail.Id == 0) {
                
                ContactDetail cd = new ContactDetail {
                    Street = contactDetail.Street,
                    City = contactDetail.City,
                    PostalCode = contactDetail.PostalCode,
                    Province = contactDetail.Province,
                    Country = contactDetail.Country,
                    EmailAddress = contactDetail.EmailAddress,
                    PhoneNumber = contactDetail.PhoneNumber
                };

                await _cdRepository.Save(cd);
                userDto.ContactDetailId = cd.Id;
                
            }                 

            _mapper.Map(userDto, user);

            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to Update User");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            IEnumerable<UserDto> usersList = new List<UserDto>();

            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);

            foreach (var user in usersToReturn)
            {
                var id = user.ContactDetailId;
                var cd = await _cdRepository.GetByContactDetailId(id);

                user.ContactDetail = cd; 
            }

            


            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            var usersToReturn = _mapper.Map<UserDto>(user);


            var cdid = usersToReturn.ContactDetailId;
            var cd = await _cdRepository.GetByContactDetailId(cdid);

            usersToReturn.ContactDetail = cd;

            return usersToReturn;
        }
    }
}