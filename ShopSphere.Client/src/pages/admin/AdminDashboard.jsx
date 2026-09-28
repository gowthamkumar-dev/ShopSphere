import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function AdminDashboard() {

  const {user} = useAuth()

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => await loadDashboard())()
  }, [])

  async function loadDashboard() {
    try {
      const [categoryResponse, productResponse, orderResponse] = await Promise.all([
        ApiService.getCategories(),
        ApiService.getProducts(),
        ApiService.getAllOrders(user.token)
      ])

      setCategories(categoryResponse.data)
      setProducts(productResponse.data)
      setOrders(orderResponse.data)
    }catch(error) {
      console.error("Error loading dashboard:", error)
    }finally {
      setLoading(false)
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

  return (
    <div className="container py-5">

      <div className="mb-5">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-secondary mb-0">Manage your ShopSphere store</p>
      </div>

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-2">Total Products</p>
                  <h2 className="fw-bold mb-0">{products.length}</h2>
                </div>
                <i className="bi bi-box-seam fs-1"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-2">Total Categories</p>
                  <h2 className="fw-bold mb-0">{categories.length}</h2>
                </div>
                <i className="bi bi-grid fs-1"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-2">Total Orders</p>
                  <h2 className="fw-bold mb-0">{orders.length}</h2>
                </div>
                <i className="bi bi-cart-check fs-1"></i>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-4">
        <h4 className="fw-bold">Quick Actions</h4>
        <p className="text-secondary">Manage your store from here</p>
      </div>

      <div className="row g-4">

        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <i className="bi bi-box-seam fs-2 mb-3"></i>
              <h5 className="fw-bold">Manage Products</h5>
              <p className="text-secondary">View, edit and delete your products.</p>
              <Link to="/admin/products" className="btn btn-dark">Manage Products</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <i className="bi bi-plus-circle fs-2 mb-3"></i>
              <h5 className="fw-bold">Add Product</h5>
              <p className="text-secondary">Add a new product to your store.</p>
              <Link to="/admin/products/add" className="btn btn-dark">Add Product</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <i className="bi bi-grid fs-2 mb-3"></i>
              <h5 className="fw-bold">Manage Categories</h5>
              <p className="text-secondary">Create, update and delete categories.</p>
              <Link to="/admin/categories" className="btn btn-dark">Manage Categories</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <i className="bi bi-receipt fs-2 mb-3"></i>
              <h5 className="fw-bold">Manage Orders</h5>
              <p className="text-secondary">View orders and update their status.</p>
              <Link to="/admin/orders" className="btn btn-dark">Manage Orders</Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard