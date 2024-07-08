import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, foodData, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    {foodData.map((item) => {
      if (cartItems[item._id] > 0) {
        return (
          <div key={item._id} className="flex items-center justify-between py-4 border-b border-gray-300">
            <div className="flex items-center space-x-4">
              <img src={url+"/images/"+item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="w-16 p-2 border rounded text-center">{cartItems[item._id]}</p>
              <p className="text-lg font-semibold">${(item.price * cartItems[item._id])}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        );
      }
      return null;
    })}
    <div className="flex items-center justify-between py-4 mt-6 border-t border-gray-300">
      <h2 className="text-xl font-bold">Total</h2>
      <p className="text-xl font-bold">${getTotalCartAmount()}</p>
    </div>
    <button onClick={()=>navigate('/order')}
     className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
      Place Order
    </button>
  </div>
  );
};

export default Cart;
