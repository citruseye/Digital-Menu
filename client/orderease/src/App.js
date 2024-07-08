import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup';
import Verify from './pages/Verify';
import MyOrders from './pages/MyOrders';
import {Toaster} from 'react-hot-toast';


function App() {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="App">
      <Toaster/>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/cart' element={<Cart/>} />
        < Route path='/order' element={<PlaceOrder/>} />
        < Route path='/verify' element={<Verify/>} />
        < Route path='/myorders' element={<MyOrders/>} />
      </Routes>
    </div>
    </>
  );
}

export default App;
