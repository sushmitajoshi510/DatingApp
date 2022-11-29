using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto //Data transfer object flattens the entities
    {
        [Required]
        public string Username { get; set; }
        
        [Required]        
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }

    
    }
}