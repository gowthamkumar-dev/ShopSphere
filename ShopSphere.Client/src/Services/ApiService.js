import axios from "axios"

const BASE_URL = "https://localhost:7036/api"

const ApiService = {

    getCategories() {
        return axios.get(`${BASE_URL}/Category/GetCategories`);
    },

    getCategory(id) {
        return axios.get(`${BASE_URL}/Category/GetCategory/${id}`);
    },

    addCategory(category, token) {
        return axios.post(`${BASE_URL}/Category/AddCategory`, category,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    updateCategory(id, category, token) {
        return axios.patch(`${BASE_URL}/Category/UpdateCategory/${id}`, category, 
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    deleteCategory(id, token) {
        return axios.delete(`${BASE_URL}/Category/DeleteCategory/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },


    getProducts() {
        return axios.get(`${BASE_URL}/Product/GetProducts`);
    },

    getProduct(id) {
        return axios.get(`${BASE_URL}/Product/GetProduct/${id}`);
    },

    addProduct(product, token) {
        return axios.post(`${BASE_URL}/Product/AddProduct`,product,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },
    updateProduct(id, product, token) {
        return axios.patch(`${BASE_URL}/Product/UpdateProduct/${id}`,product,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    deleteProduct(id, token) {
        return axios.delete(`${BASE_URL}/Product/DeleteProduct/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
    },


    register(user) {
        return axios.post(`${BASE_URL}/Auth/Register`, user);
    },

    login(user) {
        return axios.post(`${BASE_URL}/Auth/Login`, user);
    },

    createAdmin(admin) {
        return axios.post(`${BASE_URL}/Auth/CreateAdmin`, admin);
    },


    getCart(token) {
        return axios.get(`${BASE_URL}/Cart/GetCart`, {
            headers: {Authorization: `Bearer ${token}`}
        });
    },

    addToCart(cartItem, token) {
        return axios.post(`${BASE_URL}/Cart/AddToCart`, cartItem, {
            headers: {Authorization: `Bearer ${token}`}
        });
    },

    updateCartItem(id, cartItem, token) {
        return axios.patch(`${BASE_URL}/Cart/UpdateCartItem/${id}`,
            cartItem,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    removeCartItem(id, token) {
        return axios.delete(`${BASE_URL}/Cart/RemoveCartItem/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    clearCart(token) {
        return axios.delete(`${BASE_URL}/Cart/ClearCart`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },


    getWishlist(token) {
        return axios.get(`${BASE_URL}/Wishlist/GetWishlist`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    addToWishlist(productId, token) {
        return axios.post(`${BASE_URL}/Wishlist/AddToWishlist`,
            {
                productId: productId
            },
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    removeFromWishlist(id, token) {
        return axios.delete(
            `${BASE_URL}/Wishlist/RemoveFromWishlist/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },


    checkout(token) {
        return axios.post(`${BASE_URL}/Order/CheckOut`,{},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    getMyOrders(token) {
        return axios.get(`${BASE_URL}/Order/GetMyOrders`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    getOrder(id, token) {
        return axios.get(`${BASE_URL}/Order/GetOrder/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    
    getAllOrders(token) {
        return axios.get(`${BASE_URL}/Order/GetAllOrders`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    },

    updateOrderStatus(id, status, token) {
        return axios.patch(`${BASE_URL}/Order/UpdateOrderStatus/${id}?status=${encodeURIComponent(status)}`,
            {},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
    }

};

export default ApiService;