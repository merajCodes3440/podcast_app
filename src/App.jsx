import React from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/Profile';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="app">
       <ToastContainer />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<SignupPage/>}/>
           <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
