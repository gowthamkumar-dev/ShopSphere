import { useEffect, useState } from "react"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function ManageOrders() {

  const { user } = useAuth()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadOrders())()
  }, [])

  async function loadOrders() {
    try {
      const response = await ApiService.getAllOrders(user.token)
      setOrders(response.data)
    }catch(error) {
      console.error("Error loading orders:", error)
      setError("Unable to load orders")
    }finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, status) {
    try {
      await ApiService.updateOrderStatus(id, status, user.token)
      alert("Order status updated")
      await loadOrders()
    }catch(error) {
      console.error("Error updating order status:", error)
      alert("Unable to update order status")
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
        <h2 className="fw-bold">Manage Orders</h2>
        <p className="text-secondary mb-0">View and manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box-seam fs-1 text-secondary"></i>
          <h4 className="mt-3">No orders found</h4>
          <p className="text-secondary">There are no customer orders yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-12" key={order.id}>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">

                  <div className="row align-items-center">

                    <div className="col-md-2">
                      <p className="text-secondary mb-1">Order ID</p>
                      <h6 className="fw-bold mb-0">#{order.id}</h6>
                    </div>

                    <div className="col-md-2">
                      <p className="text-secondary mb-1">Customer</p>
                      <h6 className="fw-semibold mb-0">{order.userName}</h6>
                    </div>

                    <div className="col-md-2">
                      <p className="text-secondary mb-1">Date</p>
                      <h6 className="fw-semibold mb-0">{new Date(order.orderDate).toLocaleDateString()}</h6>
                    </div>

                    <div className="col-md-2">
                      <p className="text-secondary mb-1">Total</p>
                      <h6 className="fw-bold mb-0">₹{order.totalAmount}</h6>
                    </div>

                    <div className="col-md-2">
                      <p className="text-secondary mb-1">Status</p>
                      <span className="badge bg-dark">{order.status}</span>
                    </div>

                    <div className="col-md-2">
                      <select className="form-select form-select-sm" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

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

export default ManageOrders