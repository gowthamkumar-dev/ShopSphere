import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function Wishlist() {

  const { user } = useAuth()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
      (async () => await loadWishlist())();
  }, [])

  async function loadWishlist() {
    try {
      const response = await ApiService.getWishlist(user.token)
      setItems(response.data.items)
    }catch(error) {
      console.error("Wishlist Error:", error)
      setError("Unable to load wishlist")
    }finally {
      setLoading(false)
    }
  }

  async function removeItem(id) {
    try {
      await ApiService.removeFromWishlist(id, user.token)
      await loadWishlist()
    }catch(error) {
      console.error("Error removing wishlist item:", error)
    }
  }

  async function addToCart(productId) {
    try {
      await ApiService.addToCart(
        {
          productId: productId,
          quantity: 1
        },
        user.token
      )
      alert("Product added to cart")
    }catch(error) {
      console.error("Error adding product to cart:", error)
      alert("Unable to add product to cart")
    }
  }

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

      <div className="mb-4">
        <h2 className="fw-bold">My Wishlist</h2>
        <p className="text-secondary mb-0">Products you saved for later</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-heart fs-1 text-secondary"></i>
          <h4 className="mt-3">Your wishlist is empty</h4>
          <p className="text-secondary">Save your favorite products here.</p>
          <Link to="/products" className="btn btn-dark">Continue Shopping</Link>
        </div>
        ) : (
          <div className="row g-4">
            {items.map((item) => (

              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img src={item.imageUrl} alt={item.name} className="card-img-top" style={{height: "100%", objectFit: "cover"}}/>

                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-semibold">{item.name}</h5>
                    <p className="text-secondary small">{item.description}</p>
                    <h5 className="fw-bold mb-3">₹{item.price}</h5>

                    <div className="mt-auto d-grid gap-2">
                      <Link to={`/product/${item.productId}`} className="btn btn-dark">View Product</Link>

                      <button className="btn btn-outline-dark" onClick={() => addToCart(item.productId)}>
                        <i className="bi bi-cart-plus me-2"></i>Add to Cart
                      </button>
                      
                      <button className="btn btn-outline-danger" onClick={() => removeItem(item.id)}>
                        <i className="bi bi-heartbreak me-2"></i>Remove
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Wishlist