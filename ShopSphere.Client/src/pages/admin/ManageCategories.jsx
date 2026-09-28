import { useEffect, useState } from "react"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function ManageCategories() {

  const {user} = useAuth()

  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => await loadCategories())()
  }, [])

  async function loadCategories() {
    try {
      const response = await ApiService.getCategories()
      setCategories(response.data)
      console.log(response.data)
    }catch(error) {
      console.error("Error loading categories:", error)
      setError("Unable to load categories")
    }finally {
      setLoading(false)
    }
  }

  async function addCategory(e) {
    e.preventDefault()
    if(!categoryName.trim()) {
      return
    }
    setSaving(true)
    setError("")

    try {
      await ApiService.addCategory({
        categoryName: categoryName
      },user.token)

      setCategoryName("")
      await loadCategories()
    }catch(error) {
      console.error("Error adding category:", error)
      setError("Unable to add category")
    }finally {
      setSaving(false)
    }
  }

  function startEdit(category) {
    setEditId(category.id)
    setEditName(category.categoryName)
  }

  function cancelEdit() {
    setEditId(null)
    setEditName("")
  }

  async function updateCategory(id) {
    if(!editName.trim()) {
      return
    }

    setSaving(true)
    setError("")
    try {
      await ApiService.updateCategory(id, {
        categoryName: editName
      }, user.token)

      setEditId(null)
      setEditName("")
      await loadCategories()
    }catch(error) {
      console.error("Error updating category:", error)
      setError("Unable to update category")
    }finally {
      setSaving(false)
    }
  }

  async function deleteCategory(id) {
    if(!window.confirm("Are you sure you want to delete this category?")) {
      return
    }

    try {
      await ApiService.deleteCategory(id, user.token)
      await loadCategories()
    }catch(error) {
      console.error("Error deleting category:", error)
      setError("Unable to delete category")
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
    <div className="container py-5">z

      <div className="mb-5">
        <h2 className="fw-bold">Manage Categories</h2>
        <p className="text-secondary mb-0">Add, edit and delete product categories</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Add Category</h5>

          <form onSubmit={addCategory}>
            <div className="row g-3">
              <div className="col-md-9">
                <input type="text" className="form-control" placeholder="Enter category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required/>
              </div>

              <div className="col-md-3">
                <button type="submit" className="btn btn-dark w-100" disabled={saving}>
                  {saving ? "Adding..." : "Add Category"}
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">Categories</h5>

          {categories.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-secondary mb-0">No categories found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>

                      <td>{category.id}</td>

                      <td>
                        {editId === category.id ? (
                          <input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                        ) : (
                          <span className="fw-semibold">
                            {category.categoryName}
                          </span>
                        )}
                      </td>

                      <td className="text-end">
                        {editId === category.id ? (
                          <>
                            <button className="btn btn-success btn-sm me-2" onClick={() => updateCategory(category.id)} disabled={saving}>
                              Save
                            </button>

                            <button className="btn btn-outline-secondary btn-sm" onClick={cancelEdit}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-outline-dark btn-sm me-2" onClick={() => startEdit(category)}>
                              Edit
                            </button>

                            <button className="btn btn-outline-danger btn-sm" onClick={() => deleteCategory(category.id)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default ManageCategories