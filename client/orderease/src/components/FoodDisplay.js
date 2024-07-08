import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodData } = useContext(StoreContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFood = foodData.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4">
    <div className="container mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
        Our Menu
      </h1>
      {/* Search bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md w-64"
        />
      </div>
      {/* Display filtered food items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFood.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  </div>
  );
};

export default FoodDisplay;
