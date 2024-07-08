import React from 'react'
import profile from '../assets/profile.jpg'

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg w-full fixed top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-extrabold mr-6">OrderEase</h1>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={profile} 
            alt="Profile" 
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar