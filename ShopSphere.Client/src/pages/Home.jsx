import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <section className="bg-dark text-white py-5">
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-md-7">

              <span className="badge bg-light text-dark mb-3">
                Welcome to ShopSphere
              </span>

              <h1 className="display-3 fw-bold mb-3">
                Shop Smart.
                <br />
                Live Better.
              </h1>

              <p className="lead text-light mb-4">
                Discover quality products, explore amazing collections,
                and enjoy a simple shopping experience with ShopSphere.
              </p>

              <Link to="/products" className="btn btn-light btn-lg me-2">
                Shop Now
              </Link>

            </div>


            <div className="col-md-5 text-center mt-5 mt-md-0">

              <div className="bg-white text-dark rounded-4 p-5 shadow">

                <h2 className="fw-bold mb-3">
                  <i className="bi bi-bag-check-fill display-4"></i>
                </h2>

                <h4 className="fw-bold">
                  Everything You Need
                </h4>

                <p className="text-secondary mb-0">
                  Quality products. Simple shopping. Happy customers.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Why ShopSphere?
            </h2>

            <p className="text-secondary">
              Everything is designed to make your shopping experience better.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-truck display-5"></i>
                </div>

                <h5 className="fw-bold">
                  Fast Delivery
                </h5>

                <p className="text-secondary mb-0">
                  Get your favourite products delivered quickly and safely.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-shield-lock-fill display-5"></i>
                </div>

                <h5 className="fw-bold">
                  Secure Shopping
                </h5>

                <p className="text-secondary mb-0">
                  Your account and shopping experience are protected.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-star-fill display-5"></i>
                </div>

                <h5 className="fw-bold">
                  Quality Products
                </h5>

                <p className="text-secondary mb-0">
                  Explore products selected for quality and value.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-light py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-6">

              <h2 className="fw-bold mb-3">
                Find Something You Love
              </h2>

              <p className="text-secondary mb-4">
                Browse our collection and discover products that fit
                your style, needs and everyday life.
              </p>

              <Link to="/products" className="btn btn-dark px-4">
                Browse Products
              </Link>

            </div>


            <div className="col-md-6 text-center mt-4 mt-md-0">

              <div className="row g-3">

                <div className="col-6">

                  <div className="bg-white rounded-4 shadow-sm p-4">

                    <i className="bi bi-box-seam display-6"></i>

                    <h3 className="fw-bold mt-2">
                      100+
                    </h3>

                    <p className="text-secondary mb-0">
                      Products
                    </p>

                  </div>

                </div>


                <div className="col-6">

                  <div className="bg-white rounded-4 shadow-sm p-4">

                    <i className="bi bi-clock display-6"></i>

                    <h3 className="fw-bold mt-2">
                      24/7
                    </h3>

                    <p className="text-secondary mb-0">
                      Shopping
                    </p>

                  </div>

                </div>


                <div className="col-6">

                  <div className="bg-white rounded-4 shadow-sm p-4">

                    <i className="bi bi-cart-check display-6"></i>

                    <h3 className="fw-bold mt-2">
                      Easy
                    </h3>

                    <p className="text-secondary mb-0">
                      Checkout
                    </p>

                  </div>

                </div>


                <div className="col-6">

                  <div className="bg-white rounded-4 shadow-sm p-4">

                    <i className="bi bi-lock-fill display-6"></i>

                    <h3 className="fw-bold mt-2">
                      Secure
                    </h3>

                    <p className="text-secondary mb-0">
                      Payments
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="py-5">

        <div className="container">

          <div className="bg-dark text-white rounded-4 text-center p-5">

            <i className="bi bi-bag-heart display-4"></i>

            <h2 className="fw-bold mt-3 mb-3">
              Ready to Start Shopping?
            </h2>

            <p className="text-light mb-4">
              Explore ShopSphere and find your next favourite product.
            </p>

            <Link to="/products" className="btn btn-light btn-lg">
              Start Shopping
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Home