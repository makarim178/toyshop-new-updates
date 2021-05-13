namespace API.Entity
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public Product Products { get; set; }
        public int ProductId { get; set; }
        public int CartQty { get; set; }
        public double productPrice { get; set; }
    }
}