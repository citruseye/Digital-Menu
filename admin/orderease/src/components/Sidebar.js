import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-800 w-48 h-full pt-16 fixed top-0 left-0">
    <div className="p-4">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
    </div>
    <nav className="flex flex-col mt-4">
      <NavLink to='/add' className="px-4 py-2 hover:bg-gray-200 rounded-lg mb-2 mx-2">
        Add Items
      </NavLink>
      <NavLink to='/list' className="px-4 py-2 hover:bg-gray-200 rounded-lg mb-2 mx-2">
        Display Items
      </NavLink>
      <NavLink to='/orders' className="px-4 py-2 hover:bg-gray-200 rounded-lg mb-2 mx-2">
        Orders
      </NavLink>
    </nav>
  </div>
  )
}

export default Sidebar