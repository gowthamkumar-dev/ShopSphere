import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (
        <div className="card h-100 border-0 shadow-sm">
            <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{height: "300px",width: "290px", objectFit: "container"}}/>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold mb-2">{product.name}</h5>
                <div className="mt-auto">
                    <h5 className="fw-bold mb-3 text-success">₹{product.price}</h5>

                    <Link to={`/product/${product.id}`} className="btn btn-dark w-100">View Product</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard