using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.Models
{
    public class WishlistItem
    {
        [Key]
        public int Id { get; set; }
        public int WishlistId { get; set; }
        public int ProductId { get; set; }
    }
}
