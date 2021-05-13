using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entity
{
    public class AppUser: IdentityUser<int>
    {
        // public int Id { get; set; }
        // public string UserName { get; set; }
        // public byte[] PasswordHash { get; set; }
        // public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public ContactDetail ContactDetail { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastActive { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}