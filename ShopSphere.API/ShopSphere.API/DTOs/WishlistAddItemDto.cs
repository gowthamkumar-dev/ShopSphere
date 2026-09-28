using Microsoft.AspNetCore.Antiforgery;
using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.DTOs
{
    public class WishlistAddItemDto
    {
        [Required]
        public int ProductId { get; set; }
    }
}
