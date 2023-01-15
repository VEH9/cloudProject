using System;
using System.ComponentModel.DataAnnotations;

namespace Avatariki.Models.Request
{
    public class CreateReviews
    {
        [Required]
        public string Name { get; set; }
    
        [Required]
        public string Description { get; set; }
        
        [Required]
        public Int32 Mark { get; set; }
    }
}