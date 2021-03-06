using API.Entity;

namespace API.DTOs
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public int OrdersId { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public int CartQty { get; set; }
        public double ProductPrice { get; set; }
    }
}