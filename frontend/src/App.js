import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import DefaultStore from "./pages/StorePage/DefaultStore";
import ProductDetail from "./pages/Productdetail.js/ProductDetail";
import UserRoute from "./components/Route/UserRoute";
import Profile from "./pages/Accounts/Profile";
import Orders from "./pages/Accounts/Orders";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/register";
import ForgetPassword from "./pages/Auth/ForgetPass";
import ConfirmPassword from "./pages/Auth/ConfirmPass";
// Admin
import AdminRoute from "./components/Route/AdminRoute";
import AdminProfile from "./pages/Admin/Accounts/AdminProfile";
import Category from "./pages/Admin/Category/Category";
import CreateCategory from "./pages/Admin/Category/CreateCategory";
import ViewCategory from "./pages/Admin/Category/ViewCategory";
import Product from './pages/Admin/Product/Product'
import CreateProduct from './pages/Admin/Product/CreateProduct'
import ViewProduct from './pages/Admin/Product/ViewProduct'
import UpdateProduct from './pages/Admin/Product/UpdateProduct'
import SearchStore from "./pages/StorePage/SearchStore";
import Cart from './pages/Cart/Cart'
import WishlistPage from "./pages/Cart/Wishlist";
import Address from "./pages/Accounts/Address";
import Order from "./pages/Admin/Order/Order";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/confirmpassword/:token" element={<ConfirmPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/collections" element={<DefaultStore />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account/address" element={<Address />} />
        <Route path="/search/category/:id" element={<SearchStore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mywishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AdminRoute />}>
          {/* <Route path="/account/admin/profile" element={<Profile />} /> */}
        </Route>
        <Route path="/account/admin/profile" element={<AdminProfile />} />
        <Route path="/account/admin/category" element={<Category />} />
        <Route path="/account/admin/category/addcategory" element={<CreateCategory />} />
        <Route path="/account/admin/category/viewcategory" element={<ViewCategory />} />
        <Route path="/account/admin/product" element={<Product />} />
        <Route path="/account/admin/product/addproduct" element={<CreateProduct/>} />
        <Route path="/account/admin/product/viewproduct" element={<ViewProduct />} />
        <Route path="/account/admin/product/:slug" element={<UpdateProduct />} />
        <Route path="/account/admin/orders" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;