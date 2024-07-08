import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,foodData,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    tableNo:"",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodData.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      tableNo:data,
      items:orderItems,
      amount:getTotalCartAmount(),
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
      {
        navigate('/cart')
      }
  },[token])

  return (
    <form onSubmit={placeOrder}>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    <div className="flex justify-between">
      <div className="w-1/2 pr-4">
        <h2 className="text-lg font-semibold mb-4">Select Table Number:</h2>
        <select required name='tableNo' value={data.tableNo} onChange={onChangeHandler} className="w-full p-2 border border-gray-300 rounded">
        <option value="">Select Table</option>
          <option value="table1">Table 1</option>
          <option value="table2">Table 2</option>
          <option value="table3">Table 3</option>
        </select>
      </div>
      <div className="w-1/2 pl-4">
        <h2 className="text-lg font-semibold mb-4">Order Summary:</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Total:</span>
            <span className="font-bold">${getTotalCartAmount()}</span> 
          </div>
          <button type='submit'
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  </div>
  </form>
  )
}

export default PlaceOrder