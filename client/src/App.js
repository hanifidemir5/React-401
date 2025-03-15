import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { Provider } from "./components/ui/provider";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import Home from "./pages/Admin/Home";
import AdminProducts from "./pages/Admin/Products/index.js";
import Orders from "./pages/Admin/Orders/index.js";
import AdminProductDetail from "./pages/Admin/ProductDetail/index.js";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <div id="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} admin={true}>
                <Route index element={<Home />} />
                <Route path="orders" element={<Orders />} />
                <Route path={`products/:product_id`} element={<AdminProductDetail />} />
                <Route path="products" element={<AdminProducts />} />
              </Route>
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
