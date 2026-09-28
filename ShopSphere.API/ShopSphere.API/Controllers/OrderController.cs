using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopSphere.API.Models;
using System.Security.Claims;

namespace ShopSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public OrderController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        [Route("Checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var cart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var cartItems = await _appDbContext.CartItems.Where(ci => ci.CartId == cart.Id)
                .Join(
                _appDbContext.Products,
                cartItem => cartItem.ProductId,
                product => product.Id,
                (cartItem, product) => new
                {
                    CartItem = cartItem,
                    Product = product
                }
                ).ToListAsync();
            if (!cartItems.Any())
            {
                return BadRequest("Cart is empty");
            }

            decimal totalAmount = cartItems.Sum(x => x.Product.Price * x.CartItem.Quantity);

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = totalAmount,
                Status = "Pending"
            };
            await _appDbContext.Orders.AddAsync(order);
            await _appDbContext.SaveChangesAsync();

            foreach (var item in cartItems)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.Product.Id,
                    Quantity = item.CartItem.Quantity,
                    Price = item.Product.Price
                };

                await _appDbContext.OrderItems.AddAsync(orderItem);
            }
            await _appDbContext.SaveChangesAsync();

            _appDbContext.CartItems.RemoveRange(cartItems.Select(x => x.CartItem));
            await _appDbContext.SaveChangesAsync();
            return Ok(new
            {
                message = "Order placed successfully",
                orderId = order.Id,
                totalAmount = order.TotalAmount,
                status = order.Status
            });
        }

        [HttpGet]
        [Route("GetMyOrders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var orders = await _appDbContext.Orders.Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.TotalAmount,
                    o.Status
                }).ToListAsync();

            return Ok(orders);
        }

        [HttpGet]
        [Route("GetOrder/{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var order = await _appDbContext.Orders.FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);
            if (order == null)
            {
                return NotFound("Order not found");
            }

            var orderItems = await _appDbContext.OrderItems.Where(oi => oi.OrderId == order.Id)
                .Join(
                _appDbContext.Products,
                orderItem => orderItem.ProductId,
                product => product.Id,
                (orderItem, product) => new
                {
                    orderItem.Id,
                    orderItem.ProductId,
                    product.Name,
                    product.ImageUrl,
                    orderItem.Quantity,
                    orderItem.Price,
                    TotalPrice = orderItem.Price * orderItem.Quantity
                }
                ).ToListAsync();

            return Ok(new
            {
                order.Id,
                order.UserId,
                order.OrderDate,
                order.TotalAmount,
                order.Status,
                Items = orderItems
            });
        }

        [HttpGet]
        [Route("GetAllOrders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _appDbContext.Orders.OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.UserId,
                    o.OrderDate,
                    o.TotalAmount,
                    o.Status
                }).ToListAsync();

            return Ok(orders);
        }

        [HttpPatch]
        [Route("UpdateOrderStatus/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int id, string status)
        {
            var order = await _appDbContext.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound("Order not found");
            }

            order.Status = status;
            await _appDbContext.SaveChangesAsync();
            return Ok(new
            {
                message = "Order status updated successfully",
                orderId = order.Id,
                status = order.Status
            });
        }
    }
}
