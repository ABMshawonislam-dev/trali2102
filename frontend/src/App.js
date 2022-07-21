import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Menubar from "./components/Menubar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Vendor from "./components/Vendor";
import Cart from "./pages/Cart";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
   <>
    <BrowserRouter>
     <Menubar/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<Dashboard />}></Route>
      <Route path="/vendor" element={<Vendor />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/details/:id" element={<ProductDetails />}></Route>
    </Routes>
  </BrowserRouter>
   </>
    
      // <Menubar></Menubar>
      // <Home></Home>
  );
}

export default App;
