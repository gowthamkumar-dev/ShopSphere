import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function OrderDetails() {

  const { id } = useParams()
  const { user } = useAuth()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadOrder())();
  }, [id])

  async function loadOrder() {
    try {
      const response = await ApiService.getOrder(id, user.token)
      setOrder(response.data)
      console.log(response.data)
    }catch(error) {
      console.error("Order Details Error:", error)
      setError("Unable to load order details")
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

  if(error || !order) {
    return (
      <div className="container py-5 text-center">
        <h4>{error || "Order not found"}</h4>
        <Link to="/orders" className="btn btn-dark mt-3">Back to Orders</Link>
      </div>
    )
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Order #{order.id}</h2>
          <p className="text-secondary mb-0">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
        </div>

        <span className="badge text-bg-secondary fs-6">{order.status}</span>
      </div>

      <div className="row g-4">

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Items</h5>

              {order.items.map((item) => (
                <div className="row align-items-center g-3 border-bottom py-3" key={item.id}>

                  <div className="col-3 col-md-2">
                    <img src={item.imageUrl} alt={item.name} className="img-fluid rounded" style={{height: "100%", width: "80px", objectFit: "cover"}}/>
                  </div>

                  <div className="col-9 col-md-4">
                    <h6 className="fw-semibold mb-1">{item.name}</h6>
                    <p className="text-secondary small mb-0">₹{item.price} each</p>
                  </div>

                  <div className="col-6 col-md-2">
                    <span className="text-secondary small">Quantity</span>
                    <p className="fw-semibold mb-0">{item.quantity}</p>
                  </div>

                  <div className="col-6 col-md-4 text-md-end">
                    <span className="text-secondary small">Total</span>
                    <h6 className="fw-bold mb-0">₹{item.totalPrice}</h6>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Items</span>
                <span className="fw-semibold">{order.items.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Status</span>
                <span className="fw-semibold">{order.status}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total Amount</span>
                <span className="fw-bold">₹{order.totalAmount}</span>
              </div>
              
              <Link to="/orders" className="btn btn-outline-dark w-100">Back to Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails