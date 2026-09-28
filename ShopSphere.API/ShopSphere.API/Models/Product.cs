using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;
        public int CategoryId { get; set; }
    }
}
