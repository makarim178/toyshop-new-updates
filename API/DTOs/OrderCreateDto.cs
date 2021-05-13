namespace API.DTOs
{
    public class OrderCreateDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int CartQty { get; set; }
        public double productPrice { get; set; }
    }
}