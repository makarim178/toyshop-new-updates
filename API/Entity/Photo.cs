using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entity
{
    [Table("Photos")]
    public class Photo
    {
        public int id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}