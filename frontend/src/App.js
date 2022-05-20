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
    </Routes>
  </BrowserRouter>
   </>
    
      // <Menubar></Menubar>
      // <Home></Home>
  );
}

export default App;
