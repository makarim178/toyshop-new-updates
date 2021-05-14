using System;
using API.Entity;

namespace API.DTOs
{
    public class UserUpdateDtoSave
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public ContactDetail_Save contactDetailSave { get; set; }

        public DateTime LastActive { get; set; }
    }
}