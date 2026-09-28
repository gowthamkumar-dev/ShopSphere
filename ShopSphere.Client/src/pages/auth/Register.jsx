import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../../Services/ApiService"

function Register() {
    const navigate = useNavigate()

    const [user, setUser] = useState({name: "", email: "", password: ""})

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    function handleChange(e) {
      setUser({...user,
        [e.target.name]: e.target.value
      });
    }

    async function handleRegister(e) {
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        await ApiService.register(user);
        alert("Registration successful. Please login.");
        navigate("/login");
      }catch(error) {
        console.error("Registration error:", error)

        if (error.response) {
          setError(typeof error.response.data === "string" ? error.response.data : "Registration failed")
        }
        else {
          setError("Unable to connect to the server")
        }
      }
      finally {
        setLoading(false)
      }
    }

    return (
      <div className="container py-5">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <i className="bi bi-person-plus fs-1"></i>
                  <h2 className="fw-bold mt-2">Create Account</h2>
                  <p className="text-secondary">Join ShopSphere today</p>
                </div>

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your name" value={user.name} onChange={handleChange} required/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter your email" value={user.email} onChange={handleChange} required/>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter your password" value={user.password} onChange={handleChange} minLength="6" required/>
                  </div>

                  <button type="submit" className="btn btn-success w-100" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-secondary">Already have an account?</span>{" "}
                  <Link to="/login" className="text-dark fw-semibold text-decoration-none">Login</Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register