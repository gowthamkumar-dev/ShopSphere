import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function ManageProducts() {

  const { user } = useAuth()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => await loadData())()
  }, [])

  async function loadData() {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        ApiService.getProducts(),
        ApiService.getCategories()
      ])
      setProducts(productResponse.data)
      setCategories(categoryResponse.data)
    }catch(error) {
      console.error("Error loading products:", error)
    }finally {
      setLoading(false)
    }
  }

  function getCategoryName(categoryId) {
    const category = categories.find(category => category.id === categoryId)
    console.log(category)
    return category ? category.categoryName : "Unknown"
  }

  async function deleteProduct(id) { 
    if(!window.confirm("Are you sure you want to delete this product?")) {
      return
    }
    try {
      await ApiService.deleteProduct(id, user.token)
      alert("Product deleted successfully")
      await loadData()
    }catch(error) {
      console.error("Error deleting product:", error)
      alert("Unable to delete product")
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

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Manage Products</h2>
          <p className="text-secondary mb-0">Manage your ShopSphere products</p>
        </div>

        <Link to="/admin/products/add" className="btn btn-dark"><i className="bi bi-plus-lg me-2"></i>Add Product</Link>
      </div>

      {products.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-box-seam fs-1 text-secondary"></i>
            <h5 className="mt-3">No products found</h5>
            <p className="text-secondary">Add your first product to get started.</p>

            <Link to="/admin/products/add" className="btn btn-dark">Add Product</Link>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>

                    <td>{product.id}</td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={product.imageUrl} alt={product.name} className="rounded"style={{width: "60px", objectFit: "cover"}}/>

                        <div>
                          <h6 className="fw-semibold mb-1">{product.name}</h6>
                          <small className="text-secondary">{product.description}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge text-bg-light border">{getCategoryName(product.categoryId)}</span>
                    </td>

                    <td>
                      <span className="fw-semibold">₹{product.price}</span>
                    </td>

                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Link to={`/admin/products/edit/${product.id}`} className="btn btn-outline-dark btn-sm"><i className="bi bi-pencil me-1"></i>Edit</Link>

                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(product.id)}><i className="bi bi-trash me-1"></i>Delete</button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageProducts