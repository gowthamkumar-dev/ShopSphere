import { useEffect, useState } from "react"
import ApiService from "../Services/ApiService"
import ProductCard from "../components/ProductCard"

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async () => await loadProducts())();
    },[])

    async function loadProducts() {
        try {
            const response = await ApiService.getProducts();
            setProducts(response.data);
        }catch(error) {
            console.error("Error loading products:", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-5">
            <div className="mb-4">
                <h2 className="fw-bold">Products</h2>
                <p className="text-secondary">Explore our latest products</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-5">
                    <h5>No products found</h5>
                    <p className="text-secondary">There are no products available right now.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {products.map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products