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
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public CartController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetCart")]
        public async Task<IActionResult> GetCart()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

            if(cart == null)
            {
                cart = new Cart
                {
                    UserId = userId
                };

                await _appDbContext.Carts.AddAsync(cart);
                await _appDbContext.SaveChangesAsync();
            }

            var cartItem = await _appDbContext.CartItems.Where(ci => ci.CartId == cart.Id)
                .Join(
                _appDbContext.Products,
                cartItem => cartItem.ProductId,
                product => product.Id,
                (cartItem, product) => new
                {
                    cartItem.Id,
                    cartItem.ProductId,
                    product.Name,
                    product.Price,
                    product.ImageUrl,
                    cartItem.Quantity,
                    TotalPrice = product.Price * cartItem.Quantity,
                }
                )
                .ToListAsync();

            return Ok(new
            {
                cartId = cart.Id,
                userId = userId,
                items = cartItem
            });
        }

        [HttpPost]
        [Route("AddToCart")]
        public async Task<IActionResult> AddToCart(CartAddItemDto cartDto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var product = await _appDbContext.Products.FindAsync(cartDto.ProductId);
            if(product == null)
            {
                return NotFound("Product not found");
            }

            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if(cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                };
                await _appDbContext.Carts.AddAsync(cart);
                await _appDbContext.SaveChangesAsync();
            }

            var existingItem = await _appDbContext.CartItems.FirstOrDefaultAsync(ci => ci.CartId == cart.Id && ci.ProductId == cartDto.ProductId);
            if(existingItem != null)
            {
                existingItem.Quantity += cartDto.Quantity;
            }
            else
            {
                var cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = cartDto.ProductId,
                    Quantity = cartDto.Quantity,
                };
                await _appDbContext.CartItems.AddAsync(cartItem);
            }

            await _appDbContext.SaveChangesAsync();
            return Ok("Product added to cart successfully");
        }

        [HttpPatch]
        [Route("UpdateCartItem/{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartUpdateDto cartDto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cartItem = await _appDbContext.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);
            if(cartItem == null)
            {
                return NotFound("Cart item not found");
            }

            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.Id == cartItem.CartId && c.UserId == userId);
            if(cart == null)
            {
                return NotFound("Cart item does not belong to this user");
            }

            cartItem.Quantity = cartDto.Quantity;
            await _appDbContext.SaveChangesAsync();
            return Ok("Cart item updated successfully");
        }

        [HttpDelete]
        [Route("RemoveCartItem/{id}")]
        public async Task<IActionResult> RemoveCartItem(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cartItem = await _appDbContext.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);
            if(cartItem == null)
            {
                return NotFound("Cart item not found");
            }

            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.Id == cartItem.CartId && c.UserId == userId);
            if(cart == null)
            {
                return NotFound("Cart item does not belong to this user");
            }

            _appDbContext.CartItems.Remove(cartItem);
            await _appDbContext.SaveChangesAsync();
            return Ok("Cart item removed successfully");
        }

        [HttpDelete]
        [Route("ClearCart")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var cartItem = await _appDbContext.CartItems.Where(ci => ci.CartId == cart.Id).ToListAsync();

            _appDbContext.CartItems.RemoveRange(cartItem);
            await _appDbContext.SaveChangesAsync();
            return Ok("Cart cleared successfully");
        }
    }
}
