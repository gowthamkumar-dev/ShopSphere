import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../../Services/ApiService"
import { useAuth } from "../../context/AuthContext"

function Login() {

    const navigate = useNavigate()

    const {login} = useAuth()
    const [user, setUser] = useState({email: "", password: ""})

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    function handleChange(e) {
      setUser({...user,
        [e.target.name]: e.target.value
      })
    }

    async function handleLogin(e) {
      e.preventDefault()
      setError("")
      setLoading(true)
      try{
        const response = await ApiService.login(user)

        login(response.data)
        alert("Login successful")
        if (response.data.role === "Admin") {
          navigate("/admin")
        }
        else{
          navigate("/")
        }
      }catch(error) {
        console.error("Login error:", error)
        if (error.response) {
          setError(typeof error.response.data === "string" ? error.response.data : "Invalid email or password")
        }
        else {
          setError("Unable to connect to the server")
        }

      }finally{
        setLoading(false)
      }
    }

    return (
      <div className="container py-5">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-md-5">

                  <div className="text-center mb-4">
                    <i className="bi bi-person-circle fs-1"></i>
                    <h2 className="fw-bold mt-2">Welcome Back</h2>
                    <p className="text-secondary">Login to your ShopSphere account</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter your email" value={user.email} onChange={handleChange} required/>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter your password" value={user.password} onChange={handleChange} required/>
                      </div>

                      <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                      </button>
                  </form>

                  <div className="text-center mt-4">
                    <span className="text-secondary">Don't have an account?</span>{" "}
                    <Link to="/register" className="text-dark fw-semibold text-decoration-none">Register</Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login