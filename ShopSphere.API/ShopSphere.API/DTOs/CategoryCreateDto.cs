using System.ComponentModel.DataAnnotations;

namespace ShopSphere.API.DTOs
{
    public class CategoryCreateDto
    {
        [Required]
        [StringLength(50)]
        public string CategoryName { get; set; } = string.Empty;
    }
}
