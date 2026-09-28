import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const {user, isLoggedIn, logout} = useAuth()

    function handleLogout(){
        logout()
    }
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/"><i className="bi bi-shop me-2"></i>ShopSphere</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>

                        {isLoggedIn && (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/wishlist">Wishlist</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex gap-2">
                        {! isLoggedIn ? (
                            <>
                            <Link to="/login" className="btn btn-outline-dark btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-dark btn-sm">Register</Link>
                            </>
                        ) : (
                            <>
                            <span className="text-secondary small">Hi, {user.name}</span>
                            {user.role === "Admin" && (
                                <Link to="/admin" className="btn btn-outline-dark btn-sm">Admin</Link>
                            )}
                            <button className="btn btn-dark btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar