using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopSphere.API.DTOs;
using ShopSphere.API.Models;

namespace ShopSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public ProductController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _appDbContext.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("GetProduct/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _appDbContext.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(ProductCreateDto productDto)
        {
            var category = await _appDbContext.Categories.FindAsync(productDto.CategoryId);
            if (category == null)
            {
                return NotFound("Category not found");
            }

            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                ImageUrl = productDto.ImageUrl,
                CategoryId = productDto.CategoryId,
            };

            await _appDbContext.Products.AddAsync(product);
            await _appDbContext.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductUpdateDto productDto)
        {
            var fproduct = await _appDbContext.Products.FindAsync(id);
            if(fproduct == null)
            {
                return NotFound("Product not found");
            }

            var category = await _appDbContext.Categories.FindAsync(productDto.CategoryId);
            if(category == null)
            {
                return NotFound("Category not found");
            }

            fproduct.Name = productDto.Name;
            fproduct.Description = productDto.Description;
            fproduct.Price = productDto.Price;
            fproduct.ImageUrl = productDto.ImageUrl;
            fproduct.CategoryId = productDto.CategoryId;

            await _appDbContext.SaveChangesAsync();
            return Ok(fproduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var fproduct = await _appDbContext.Products.FindAsync(id);
            if (fproduct == null)
            {
                return NotFound("Product not found");
            }
            _appDbContext.Products.Remove(fproduct);
            await _appDbContext.SaveChangesAsync();
            return Ok("Product deleted successfully");
        }
    }
}
