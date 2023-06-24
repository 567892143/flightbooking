import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './loginpage';
import Forgot from './forgotpage';
import UserHome from './userhome'; // Import UserHome component
import AdminHome from './adminhome'; // Import AdminHome component
import Landinpage from './landingpage';
import Register from './registerpage';

const App = () => {
  return (
    <Router>
        <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/reset' element={<Forgot/>} />
      <Route path="/landingpage" element={<Landinpage />} /> 
        <Route path="/admin-home" element={<AdminHome />} /> 
        <Route path="/user-home" element={<UserHome />} /> 
      
    
      </Routes>
    </Router>
  );
};

export default App;


