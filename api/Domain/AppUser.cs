using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Assessment.Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentStatus { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Gender { get; set; }
        public string Major { get; set; }
        public string Country { get; set; }
        public int Age { get; set; }
        public int SAT { get; set; }
        public int Grade { get; set; }
        public int Height { get; set; }

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    }
}