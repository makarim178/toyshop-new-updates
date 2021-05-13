using System;
using System.Collections.Generic;
using API.Entity;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Skn { get; set; }        
        public string ProductName { get; set; }
        public string ProductDesc { get; set; }      
        public string PhotoUrl { get; set; }  
        public Category Category { get; set; }
        public Brand Brand { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public int RecommendedMinimumAge { get; set; }
        public string RecommendedGender { get; set; }
        public double ProductPrice { get; set; }
        public int AvailableQty { get; set; }
        public int MinOrderQty { get; set; }
        public DateTime ProductCreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }
}