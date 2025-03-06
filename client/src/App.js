import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "./components/ui/provider";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Products from "./components/Products";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <div id="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
