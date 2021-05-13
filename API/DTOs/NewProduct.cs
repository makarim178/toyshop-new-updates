using System;
using System.Collections.Generic;
using API.Entity;

namespace API.DTOs
{
    public class NewProduct
    {
        public string Skn { get; set; }        
        public string ProductName { get; set; }
        public string ProductDesc { get; set; }        
        public Category Category { get; set; }
        public Brand Brand { get; set; }
        public int RecommendedMinimumAge { get; set; }
        public string RecommendedGender { get; set; }
        public double ProductPrice { get; set; }
        public int AvailableQty { get; set; }
        public int MinOrderQty { get; set; }
    }
}