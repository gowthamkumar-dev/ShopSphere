using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}
