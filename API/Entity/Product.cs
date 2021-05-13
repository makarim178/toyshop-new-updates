using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entity
{
    public class Product
    {
        public int Id { get; set; }        
        public string Skn { get; set; }        
        public string ProductName { get; set; }
        public string ProductDesc { get; set; }        
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public Brand Brand { get; set; }
        public int BrandId { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public int RecommendedMinimumAge { get; set; }
        public string RecommendedGender { get; set; }
        public double ProductPrice { get; set; }
        public int AvailableQty { get; set; }
        public int MinOrderQty { get; set; }
        public DateTime ProductCreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }
}