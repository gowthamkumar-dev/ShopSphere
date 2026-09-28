import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row g-4">

                    <div className="col-lg-4 col-md-6">
                        <Link to="/" className="text-white text-decoration-none">
                            <h3 className="fw-bold mb-3"><i className="bi bi-shop me-2"></i>ShopSphere</h3>
                        </Link>
                        <p className="text-secondary lh-lg">Discover quality products, great prices, and a seamless shopping experience — all in one place.</p>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-semibold mb-4">Shop</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <Link to="/" className="text-secondary text-decoration-none">Home</Link>
                            </li>

                            <li className="mb-3">
                                <Link to="/products" className="text-secondary text-decoration-none">Products</Link>
                            </li>

                            <li className="mb-3">
                                <Link to="/wishlist" className="text-secondary text-decoration-none">Wishlist</Link>
                            </li>

                            <li>
                                <Link to="/cart" className="text-secondary text-decoration-none">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-semibold mb-4">Account</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <Link to="/login" className="text-secondary text-decoration-none">Login</Link>
                            </li>

                            <li className="mb-3">
                                <Link to="/register" className="text-secondary text-decoration-none">Register</Link>
                            </li>

                            <li className="mb-3">
                                <Link to="/orders" className="text-secondary text-decoration-none">My Orders</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <h5 className="fw-semibold mb-4">Get in Touch</h5>

                        <div className="text-secondary">
                            <p className="mb-3"><i className="bi bi-envelope me-3 text-white"></i>gowtham.kumar.dev.in@gmail.com</p>
                            <p className="mb-3"><i className="bi bi-telephone me-3 text-white"></i>+91 93606 77168</p>
                            <p className="mb-0"><i className="bi bi-geo-alt me-3 text-white"></i>India</p>
                        </div>
                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="text-secondary mb-0">© 2026 ShopSphere. All rights reserved.</p>
                    </div>

                    <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                        <span className="text-secondary me-3">Privacy Policy</span>
                        <span className="text-secondary">Terms & Conditions</span>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer