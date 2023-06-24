import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import backgroundImage from './images/WINGS.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User login successful:', userCredential);
        navigate('/landingpage');
      })
      .catch((error) => {
        console.error('User login failed:', error);
      });
  };

  const handleAdminLogin = () => {
    // Logic for admin login using email and password
    // You can use the same `signInWithEmailAndPassword` method for admin login as well
    // Replace the placeholders below with actual values


    signInWithEmailAndPassword(auth, email1, password1)
      .then((userCredential) => {
        console.log('Admin login successful:', userCredential);
        navigate('/admin-home');
      })
      .catch((error) => {
        console.error('Admin login failed:', error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange1 = (e) => {
    setEmail1(e.target.value);
  };

  const handlePasswordChange1= (e) => {
    setPassword1(e.target.value);
  };


  return (
    <div className="flex justify-center items-center h-screen bg-slate-600">
      {/* User Login */}
      <div className="absolute top-4 left-4 w-56">
        <img src={backgroundImage} alt="Logo" className='rounded-full'/>
      </div>
      <div className="rounded-md w-1/3 border-black border-2 bg-white p-4">
        <div className="flex flex-col">
          <h2 className="flex items-center justify-center text-4xl font-bold mb-4">
            User Login
          </h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          <button
            onClick={handleUserLogin}
            className="bg-blue-500 w-1/4 rounded-md py-2 text-white hover:text-red-400 mb-2"
          >
            Login
          </button>
          <div className="flex justify-between">
            <Link to="/reset" className="text-blue-500 hover:text-red-400">
              Reset Password?
            </Link>
            <Link to="/register" className="text-blue-500 hover:text-red-400">
              Register Here
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Login */}
      <div className="rounded-md w-1/3 border border-black border-2 bg-white p-4">
        <div className="flex flex-col">
          <h2 className="flex items-center justify-center text-4xl font-bold mb-4">
            Admin Login
          </h2>
          <label htmlFor="admin-email">Email:</label>
          <input
            type="email"
            id="admin-email"
            value={email1}
            onChange={handleEmailChange1}
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          <label htmlFor="admin-password">Password:</label>
          <input
            type="password"
            id="admin-password"
            value={password1}
            onChange={handlePasswordChange1}
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          <button
            onClick={handleAdminLogin}
            className="bg-blue-500 w-1/4 rounded-md py-2 text-white hover:text-red-400 mb-2"
          >
            Login
          </button>
          <div className="flex justify-between">
            <Link to="/reset" className="text-blue-500 hover:text-red-400">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-500 hover:text-red-400">
              Register as admin
            </Link>
          </div>
        </div>
      </div>
    

</div>
  );
};

export default Login;