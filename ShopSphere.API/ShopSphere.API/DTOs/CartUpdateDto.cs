using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.DTOs
{
    public class CartUpdateDto
    {
        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }
    }
}
