using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.DTOs
{
    public class CartAddItemDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }
    }
}
