import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const FoodItem = ({id,name,price,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div key={id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={url+"/images/"+image} alt={name} className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-2">${price}</p>
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <button onClick={()=>removeFromCart(id)} 
          disabled={cartItems[id] === 0}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-gray-700">{cartItems[id]}</span>
          <button onClick={()=>addToCart(id)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodItem