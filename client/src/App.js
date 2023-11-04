import Home from './Pages/home';
import { Route,Routes } from "react-router-dom"
import Login from "./Pages/login"
import Register from "./Pages/register"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer/>
       <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/register" element={<Register/>}></Route>
       </Routes>
    </div>
  );
}

export default App;
