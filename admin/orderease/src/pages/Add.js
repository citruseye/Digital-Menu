import React, { useState } from "react";
import noimage from "../assets/noimage.jpg";
import axios from "axios";
import toast from "react-hot-toast";

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Starters",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if ((response.data.success)) {
      setData({
        name: "",
        price: "",
        category: "Starters",
      })
      setImage(false)
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-24 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add New Item
      </h2>

      <form className="space-y-6" onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-center">
          <label
            htmlFor="image"
            className="block text-gray-700 mb-2 w-3/4 text-left"
          >
            Upload Image
          </label>
          <img
            src={image ? URL.createObjectURL(image) : noimage}
            alt=""
            className="mb-4 w-3/4 h-48 object-cover rounded-md"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="name"
            className="block text-gray-700 mb-2 w-3/4 text-left"
          >
            Product Name
          </label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="product-category"
            className="block text-gray-700 mb-2 w-3/4 text-left"
          >
            Product Category
          </label>
          <select
            onChange={onChangeHandler}
            name="category"
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Category</option>
            <option value="Starters">Starters</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Sides">Sides</option>
            <option value="Salads">Salads</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="price"
            className="block text-gray-700 mb-2 w-3/4 text-left"
          >
            Price
          </label>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            min="0"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
