using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }   

        [Required]
        public string Type { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string PrimaryImage { get; set; }

        [Required]
        public string Sizes { get; set; }

        [Required]
        public string Colors { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Description { get; set; }
    }
}