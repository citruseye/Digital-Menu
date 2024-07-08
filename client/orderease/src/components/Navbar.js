import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import profile from '../assets/profile.jpg';
import toast from 'react-hot-toast'

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully")
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-extrabold mr-6">OrderEase</h1>
          <div className="hidden md:flex space-x-4">
            <Link to='/'><p className="text-white hover:text-gray-200 cursor-pointer">Menu</p></Link>
            <Link to='/cart'><p className="text-white hover:text-gray-200 cursor-pointer">Cart</p></Link>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Sign In
            </button>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <p onClick={() => navigate('/myorders')} className="text-white hover:text-gray-200 cursor-pointer">Orders</p>
              <p onClick={logout} className="text-white hover:text-gray-200 cursor-pointer">Logout</p>
              <div className="relative">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-start space-y-2 p-4">
            <Link to='/'><p className="text-white hover:text-gray-200 cursor-pointer">Menu</p></Link>
            <Link to='/cart'><p className="text-white hover:text-gray-200 cursor-pointer">Cart</p></Link>
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Sign In
              </button>
            ) : (
              <>
                <p onClick={() => navigate('/myorders')} className="text-white hover:text-gray-200 cursor-pointer">Orders</p>
                <p onClick={logout} className="text-white hover:text-gray-200 cursor-pointer">Logout</p>
                <div className="relative">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
