import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"

import Navbar from "./Components/Navbar"
import Footer from "./components/Footer"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/cart/Cart"
import Wishlist from "./pages/wishlist/Wishlist"
import Orders from "./pages/orders/Orders"
import OrderDetails from "./pages/orders/OrderDetails"

import AdminDashboard from "./pages/admin/AdminDashboard"
import ManageCategories from "./pages/admin/ManageCategories"
import ManageProducts from "./pages/admin/ManageProducts"
import AddProduct from "./pages/admin/AddProduct"
import EditProduct from "./pages/admin/EditProduct"
import ManageOrders from "./pages/admin/ManageOrders"

function App() {
  
  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/products" element={<Products />}/>
      <Route path="/product/:id" element={<ProductDetails />}/>

      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }/>
      <Route path="/wishlist" element={
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      }/>
      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      }/>
      <Route path="/order/:id" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      }/>
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}>
          <AdminDashboard />
        </ProtectedRoute>
      }/>
      <Route path="/admin/categories" element={
        <ProtectedRoute adminOnly={true}>
          <ManageCategories />
        </ProtectedRoute>
      }/>
      <Route path="/admin/products" element={
        <ProtectedRoute adminOnly={true}>
          <ManageProducts />
        </ProtectedRoute>
      }/>
      <Route path="/admin/products/add" element={
        <ProtectedRoute adminOnly={true}>
          <AddProduct />
        </ProtectedRoute>
      }/>
      <Route path="/admin/products/edit/:id" element={
        <ProtectedRoute adminOnly={true}>
          <EditProduct />
        </ProtectedRoute>
      }/>
      <Route path="/admin/orders" element={
        <ProtectedRoute adminOnly={true}>
          <ManageOrders />
        </ProtectedRoute>
      }/>
    </Routes>

    <Footer />
    </>
  )
}

export default App
