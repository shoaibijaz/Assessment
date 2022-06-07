using System.ComponentModel.DataAnnotations;

namespace Assessment.DTOs
{
    public class RegisterDto
    {
        public string ID { get; set; }

        [Required]
        public string FirstName { get; set; }
        
        [Required]
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

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        public string Username { get; set; }
    }
}