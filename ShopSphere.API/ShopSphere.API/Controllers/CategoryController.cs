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
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public CategoryController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _appDbContext.Categories.ToListAsync();
            return Ok(categories);
        }

        [HttpGet]
        [Route("GetCategory/{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _appDbContext.Categories.FindAsync(id);
            if(category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        [Route("AddCategory")]
        public async Task<IActionResult> AddCategory(CategoryCreateDto categoryDto)
        {
            var category = new Category
            {
                CategoryName = categoryDto.CategoryName
            }; 

            await _appDbContext.Categories.AddAsync(category);
            await _appDbContext.SaveChangesAsync();
            return Ok(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryUpdateDto categoryDto)
        {
            var fcategory = await _appDbContext.Categories.FindAsync(id);
            if(fcategory == null)
            {
                return NotFound("Category not found");
            }

            fcategory.CategoryName = categoryDto.CategoryName;
            await _appDbContext.SaveChangesAsync();
            return Ok(fcategory);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var fcategory = await _appDbContext.Categories.FindAsync(id);
            if(fcategory == null)
            {
                return NotFound("Category not found");
            }

            _appDbContext.Categories.Remove(fcategory);
            await _appDbContext.SaveChangesAsync();
            return Ok("Category deleted successfully");
        }
    }
}
