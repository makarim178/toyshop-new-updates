using System;
using API.Entity;

namespace API.DTOs
{
    public class UserUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactDetailId { get; set; }
        public DateTime DateOfBirth { get; set; }

        public DateTime LastActive { get; set; }

    }
}