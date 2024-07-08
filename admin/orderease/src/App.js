import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { Toaster } from "react-hot-toast"


function App() {

  const url = "http://localhost:4000"

  return (
    <div className="App">
      <Toaster/>
          <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="flex-1 ml-48 pt-16">
      <div className="p-4">
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
