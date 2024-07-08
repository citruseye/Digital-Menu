import React from 'react';
import { menuData } from '../assets/MenuData';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="bg-gray-100 min-h-full p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-4">Explore Menu</h1>
        <div className="flex space-x-6 overflow-x-auto cursor-pointer pb-4">
          {menuData.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.category ? "All" : item.category)} 
              key={index} 
              className="bg-white shadow-lg rounded-lg overflow-hidden flex-shrink-0"
              style={{ minWidth: '200px' }}
            >
              <img src={item.image} alt={item.category} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{item.category}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreMenu;

