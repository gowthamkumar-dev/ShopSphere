using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopSphere.API.DTOs;
using ShopSphere.API.Models;
using System.Security.Claims;

namespace ShopSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public WishlistController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetWishlist")]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var wishlist = await _appDbContext.Wishlists.FirstOrDefaultAsync(w => w.UserId == userId);
            if(wishlist == null)
            {
                wishlist = new Wishlist
                {
                    UserId = userId,
                };

                await _appDbContext.Wishlists.AddAsync(wishlist);
                await _appDbContext.SaveChangesAsync();
            }

            var wishlistItems = await _appDbContext.WishlistItems.Where(wi => wi.WishlistId == wishlist.Id)
                .Join(
                _appDbContext.Products,
                wishlistItems => wishlistItems.ProductId,
                product => product.Id,
                (wishlistItems, product) => new
                {
                    wishlistItems.Id,
                    wishlistItems.ProductId,
                    product.Name,
                    product.Description,
                    product.Price,
                    product.ImageUrl
                }
                ).ToListAsync();

            return Ok(new
            {
                wishlistId = wishlist.Id,
                userId = userId,
                items = wishlistItems
            });
        }

        [HttpPost]
        [Route("AddToWishlist")]
        public async Task<IActionResult> AddToWishlist(WishlistAddItemDto wishlistDto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var product = await _appDbContext.Products.FindAsync(wishlistDto.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            var wishlist = await _appDbContext.Wishlists.FirstOrDefaultAsync(w => w.UserId == userId);
            if (wishlist == null)
            {
                wishlist = new Wishlist
                {
                    UserId = userId
                };

                await _appDbContext.Wishlists.AddAsync(wishlist);
                await _appDbContext.SaveChangesAsync();
            }

            var existingItem = await _appDbContext.WishlistItems.FirstOrDefaultAsync(wi => wi.WishlistId == wishlist.Id && wi.ProductId == wishlistDto.ProductId);
            if (existingItem != null)
            {
                return BadRequest("Product already exists in wishlist");
            }

            var wishlistItem = new WishlistItem
            {
                WishlistId = wishlist.Id,
                ProductId = wishlistDto.ProductId
            };

            await _appDbContext.WishlistItems.AddAsync(wishlistItem);
            await _appDbContext.SaveChangesAsync();

            return Ok("Product added to wishlist successfully");
        }

        [HttpDelete]
        [Route("RemoveFromWishlist/{id}")]
        public async Task<IActionResult> RemoveFromWishlist(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var wishlistItem = await _appDbContext.WishlistItems.FirstOrDefaultAsync(wi => wi.Id == id);
            if (wishlistItem == null)
            {
                return NotFound("Wishlist item not found");
            }

            var wishlist = await _appDbContext.Wishlists.FirstOrDefaultAsync(w => w.Id == wishlistItem.WishlistId && w.UserId == userId);
            if (wishlist == null)
            {
                return NotFound("Wishlist item does not belong to this user");
            }

            _appDbContext.WishlistItems.Remove(wishlistItem);
            await _appDbContext.SaveChangesAsync();

            return Ok("Product removed from wishlist successfully");
        }
    }
}
