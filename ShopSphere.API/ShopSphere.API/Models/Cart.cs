using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
    }
}
