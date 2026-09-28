import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function Orders() {

  const { user } = useAuth()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadOrders())()
  }, [])

  async function loadOrders() {
    try {
      const response = await ApiService.getMyOrders(user.token)
      setOrders(response.data)
    }catch(error) {
      console.error("Orders Error:", error)
      setError("Unable to load orders")
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
      <h2 className="fw-bold">My Orders</h2>
      <p className="text-secondary">View your order history</p>
    </div>

    {orders.length === 0 ? (
      <div className="text-center py-5">
        <i className="bi bi-box-seam fs-1 text-secondary"></i>
        <h4 className="mt-3">No orders yet</h4>
        <p className="text-secondary">Your placed orders will appear here.</p>
        <Link to="/products" className="btn btn-dark">Start Shopping</Link>
      </div>
    ) : (
      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-12 col-lg-6" key={order.id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start mb-3">

                  <div>
                    <h5 className="fw-bold mb-1">Order #{order.id}</h5>
                    <p className="text-secondary small mb-0">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  
                  <span className="badge text-bg-secondary">{order.status}</span>
                </div>
                <hr />
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary">Total Amount</span>
                    <h5 className="fw-bold mb-0">₹{order.totalAmount}</h5>
                  </div>
                  
                  <Link to={`/order/${order.id}`} className="btn btn-dark">View Details</Link>
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

export default Orders