using System;
using API.Entity;

namespace API.DTOs
{
    public class UserUpdateRecData
    {
        public string UserName {get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int ContactDetailId { get; set; }
        public ContactDetail ContactDetail { get; set; }
    }
}