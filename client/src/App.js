import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { Provider } from "./components/ui/provider";
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
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
