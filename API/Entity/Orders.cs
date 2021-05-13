using System;
using System.Collections.Generic;

namespace API.Entity
{
    public class Orders
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId{get;set;}
    
        public ContactDetail ContactDetail { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdated { get; set; }
    
    }
}