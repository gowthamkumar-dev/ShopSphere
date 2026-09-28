import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function Cart() {

  const navigate = useNavigate()
  const { user } = useAuth()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    (async () => await loadCart())()
  }, [])

  async function loadCart() {
  try {
    const response = await ApiService.getCart(user.token)

    console.log("Cart Response:", response.data)
    setItems(response.data.items)
  }catch(error) {
    console.error("Cart Error:", error)
    console.log("Status:", error.response?.status)
    console.log("Response:", error.response?.data)
    setError("Unable to load cart")
  }finally {
    setLoading(false)
  }
}

  async function updateQuantity(id, quantity) {
    if(quantity < 1) {
      return
    }
    try {
      await ApiService.updateCartItem(id, {quantity}, user.token)
      await loadCart()
    }catch(error) {
      console.error("Error updating cart:", error)
    }
  }

  async function removeItem(id) {
    try {
      await ApiService.removeCartItem(id, user.token)
      await loadCart()
    }catch(error) {
      console.error("Error removing cart item:", error)
    }
  }

  async function clearCart() {
    try {
      await ApiService.clearCart(user.token)
      await loadCart()
    }catch(error) {
      console.error("Error clearing cart:", error)
    }
  }

  async function handleCheckout() {
    setCheckoutLoading(true)
    try {
      const response = await ApiService.checkout(user.token)

      alert("Order placed successfully")
      navigate(`/order/${response.data.orderId}`)
    }catch(error) {
      console.error("Checkout error:", error)
      alert("Unable to place order")
    }finally {
      setCheckoutLoading(false)
    }
  }

  const totalAmount = items.reduce((total, item) => total + item.totalPrice, 0)

  if(loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  if(error) {
    return (
      <div className="container py-5 text-center">
        <h4>{error}</h4>
      </div>
    )
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Your Cart</h2>
          <p className="text-secondary mb-0">Review your selected products</p>
        </div>

        {items.length > 0 && (
          <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-secondary"></i>
          <h4 className="mt-3">Your cart is empty</h4>
          <p className="text-secondary">Add some products to your cart.</p>
          <Link to="/products" className="btn btn-dark">Continue Shopping</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {items.map((item) => (
              <div className="card border-0 shadow-sm mb-3" key={item.id}>
                <div className="card-body">
                  <div className="row align-items-center g-3">

                    <div className="col-md-2">
                      <img src={item.imageUrl} alt={item.name} className="img-fluid rounded" style={{height: "100%", width: "100%", objectFit: "cover"}}/>
                    </div>

                    <div className="col-md-4">
                      <h5 className="fw-semibold mb-1">{item.name}</h5>
                      <p className="text-secondary mb-0">₹{item.price}</p>
                    </div>

                    <div className="col-md-3">
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-outline-dark btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="fw-semibold">{item.quantity}</span>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <h6 className="fw-bold mb-0">₹{item.totalPrice}</h6>
                    </div>

                    <div className="col-md-1 text-end">
                      <button className="btn btn-link text-danger p-0" onClick={() => removeItem(item.id)}><i className="bi bi-trash fs-5"></i></button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">Items</span>
                    <span>{items.length}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">Total</span>
                    <span className="fw-bold">₹{totalAmount}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Grand Total</span>
                    <span className="fw-bold">₹{totalAmount}</span>
                  </div>

                  <button className="btn btn-dark w-100" onClick={handleCheckout} disabled={checkoutLoading}>
                    {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart