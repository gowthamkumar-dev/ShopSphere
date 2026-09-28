import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"


function AddProduct() {

  const navigate = useNavigate()
  const { user } = useAuth()

  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: ""
  })

  const [loading, setLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadCategories())()
  }, [])

  async function loadCategories() {
    try {
      const response = await ApiService.getCategories()
      setCategories(response.data)
    }catch(error) {
      console.error("Error loading categories:", error)
      setError("Unable to load categories")
    }finally {
      setCategoryLoading(false)
    }
  }

  function handleChange(e) {
    setProduct({...product,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await ApiService.addProduct({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        categoryId: Number(product.categoryId)
      }, user.token)
      alert("Product added successfully")
      navigate("/admin/products")
    }catch(error) {
        console.error("Add Product Error:", error)

        if(error.response) {
          console.log("Status:", error.response.status)
          console.log("Response:", error.response.data)

          setError(typeof error.response.data === "string" ? error.response.data : "Unable to add product")
        }else {
          setError("Unable to connect to the server")
        }
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold">Add Product</h2>
        <p className="text-secondary">Add a new product to your store</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter product name" value={product.name} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea name="description" className="form-control" rows="4" placeholder="Enter product description" value={product.description} onChange={handleChange} required></textarea>
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Price</label>
                    <input type="number" name="price" className="form-control" placeholder="Enter price" value={product.price} onChange={handleChange} min="0" step="0.01" required/>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Category</label>

                    <select name="categoryId" className="form-select" value={product.categoryId} onChange={handleChange} disabled={categoryLoading} required>
                      <option value="">
                        {categoryLoading ? "Loading categories..." : "Select category"}
                      </option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Image Url</label>
                  <input type="text" name="imageUrl" className="form-control" placeholder="/images/nikeshoe.webp" value={product.imageUrl} onChange={handleChange} required/>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-dark px-4" disabled={loading || categoryLoading}>
                    {loading ? "Adding Product..." : "Add Product"}
                  </button>

                  <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate("/admin/products")}>Cancel</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct