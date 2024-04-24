import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from "./components/About.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
       <Route path="/about" element={<About/>}/> 
    </Routes>
  </BrowserRouter>
  <ToastContainer/>
  </React.StrictMode>,
)
