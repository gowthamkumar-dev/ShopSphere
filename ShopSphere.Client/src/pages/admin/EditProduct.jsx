import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function EditProduct() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: ""
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadData())()
  }, [id])

  async function loadData() {
    try {
      const productResponse = await ApiService.getProduct(id)
      const categoryResponse = await ApiService.getCategories()

      setProduct(productResponse.data)
      setCategories(categoryResponse.data)
    }catch(error) {
      console.error("Error loading product:", error)
      setError("Unable to load product")
    }finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    setProduct({...product,
      [e.target.name]: e.target.value
    })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      await ApiService.updateProduct(id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        categoryId: Number(product.categoryId)
      }, user.token)

      alert("Product updated successfully")
      navigate("/admin/products")
    }catch(error) {
      console.error("Update product error:", error)

      if(error.response) {
        setError(typeof error.response.data === "string" ? error.response.data : "Unable to update product")
      }else {
        setError("Unable to connect to the server")
      }
    }finally {
      setSaving(false)
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
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">

              <div className="mb-4">
                <h2 className="fw-bold">Edit Product</h2>
                <p className="text-secondary mb-0">Update product information</p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdate}>

                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="4" value={product.description} onChange={handleChange} required></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} min="0" step="0.01" required/>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select name="categoryId" className="form-select" value={product.categoryId} onChange={handleChange} required>

                      <option value="">Select Category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Image URL</label>
                  <input type="text" name="imageUrl" className="form-control" value={product.imageUrl} onChange={handleChange} placeholder="Eg:/images/nikeshoe.webp" required/>
                </div>

                {product.imageUrl && (
                  <div className="mb-4 text-center">
                    <img src={product.imageUrl} alt={product.name} className="img-fluid rounded" style={{width: "200px", objectFit: "cover"}}/>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-dark px-4" onClick={() => navigate("/admin/products")}>
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-dark px-4" disabled={saving}>
                    {saving ? "Updating..." : "Update Product"}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditProduct