using API.Entity;

namespace API.DTOs
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; }
        public int CartQty { get; set; }
        public double ProductPrice { get; set; }
    }
}