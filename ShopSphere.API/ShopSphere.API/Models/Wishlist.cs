using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.Models
{
    public class Wishlist
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
    }
}
