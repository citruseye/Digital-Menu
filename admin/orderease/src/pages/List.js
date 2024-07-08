import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const List = ({url}) => {
  
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 max-w-3xl">
    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Food Items</h2>
    <div className="space-y-4">
      {list.map((item,index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
          <img src={`${url}/images/`+item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <p className="text-gray-500 text-sm">{item.category}</p>
          </div>
          <button onClick={()=>removeFood(item._id)} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default List