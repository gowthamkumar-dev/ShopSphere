import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApiService from "../Services/ApiService"
import { useAuth } from "../context/AuthContext"


function ProductDetails() {
  const { id } = useParams()
  const { user, isLoggedIn } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    (async () => await loadProduct())();
  }, [id]);

  async function loadProduct() {
    try {
      const response = await ApiService.getProduct(id)
      setProduct(response.data)
    }catch(error) {
      console.error("Error loading product:", error)
    }finally {
      setLoading(false)
    }
  }

  async function addToCart() {
  if(!isLoggedIn) {
    alert("Please login to add products to cart")
    return
  }
  setCartLoading(true)

  try {
    const response = await ApiService.addToCart(
      {
        productId: product.id,
        quantity: 1
      },
      user.token
    )

    console.log("Add Cart Response:", response.data)
    alert("Product added to cart")
  }catch(error) {
    console.error("Add Cart Error:", error)
    console.log("Status:", error.response?.status)
    console.log("Response:", error.response?.data)
    alert("Unable to add product to cart")
  }finally {
    setCartLoading(false)
  }
}

  async function addToWishlist() {
    if(!isLoggedIn) {
    alert("Please login to add products to wishlist")
    return
    }
    setWishlistLoading(true)
    try {
      await ApiService.addToWishlist(product.id,user.token)
      alert("Product added to wishlist")
    }catch(error) {
      console.error("Error adding product to wishlist:", error)
      if(error.response) {
        alert(typeof error.response.data === "string" ? error.response.data : "Unable to add product to wishlist")}
      else {
        alert("Unable to connect to the server")
      }
    }finally {
      setWishlistLoading(false)
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

  if(!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found</h4>
        <p className="text-secondary">The product you are looking for does not exist.</p>
      </div>
    )
  }
  
  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">

        <div className="col-md-6">
          <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow-sm w-100" style={{height: "100%", objectFit: "cover"}}/>
        </div>

        <div className="col-md-6">

          <p className="text-secondary mb-2">Product Details</p>
          <h1 className="fw-bold mb-3">{product.name}</h1>
          <h3 className="fw-bold mb-4 text-success">₹{product.price}</h3>
          <p className="text-secondary lh-lg mb-4">{product.description}</p>

          <div className="d-flex gap-3">
            <button className="btn btn-dark px-4" onClick={addToCart} disabled={cartLoading}>
              <i className="bi bi-cart-plus me-2"></i>
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>

            <button className="btn btn-outline-dark px-4" onClick={addToWishlist} disabled={wishlistLoading}>
              <i className="bi bi-heart me-2"></i>
              {wishlistLoading ? "Adding..." : "Wishlist"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails