import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault()
      let newUrl = url;
      if (currState==="Login") {
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
    }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-50">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">{currState}</h2>
      <form onSubmit={onLogin}>
        {currState==="Login"?<></>:
        <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          name='name'
          onChange={onChangeHandler}
          value={data.name}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
        }
      
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >{currState==="Sign Up"?"Create Account":"Login"}</button>
      </form>
      <div className="text-center mt-4">
        {currState==="Login"?
         <p className="text-gray-700">
         Don't have an account?{' '}
         <span onClick={()=>setCurrState("Sign Up")}
           className="text-blue-600 hover:text-blue-800 cursor-pointer"
         >
           Create a new account
         </span>
       </p>:
       <p className="text-gray-700">
       Already have an account?{' '}
       <span onClick={()=>setCurrState("Login")}
         className="text-blue-600 hover:text-blue-800 cursor-pointer"
       >
         Login here
       </span>
     </p>}
       
      </div>
    </div>
  </div>
  )
}

export default LoginPopup