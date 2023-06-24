import { Link, navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from "react";

import backgroundImage from './images/WINGS.png';
const EmailInput = ({ email, setEmail }) => {
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="email" className="text-lg">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
      />
    </div>
  );
};

const UsernameInput = ({ username, setUsername }) => {
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="username" className="text-lg">
        Username:
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Username"
      />
    </div>
  );
};

const PasswordInput = ({ password, setPassword, reenterPassword, setReenterPassword }) => {
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReenterPasswordChange = (e) => {
    setReenterPassword(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="password" className="text-lg">
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
      />

      <label htmlFor="reenter-password" className="text-lg">
        Re-enter Password:
      </label>
      <input
        type="password"
        id="reenter-password"
        value={reenterPassword}
        onChange={handleReenterPasswordChange}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Re-enter Password"
      />
    </div>
  );
};

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registration successful, do something with userCredential
        console.log('Registration successful:', userCredential);
        
        // Reset the form after successful registration
        setEmail('');
        setUsername('');
        setPassword('');
        setReenterPassword('');
        window.alert("succesful registrated");
        
      })
      .catch((error) => {
        // User registration failed, handle error
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-600">
      <div className="absolute top-4 left-4 w-56">
        <img src={backgroundImage} alt="Logo" className='rounded-full'/>
      </div>
      <div className="rounded-md w-1/3 border border-black border-2 bg-white p-4">
        <div className="flex flex-col">
          <h2 className="flex items-center justify-center text-4xl font-bold mb-4">
            Registration Page
          </h2>
          <EmailInput email={email} setEmail={setEmail} />
          <UsernameInput username={username} setUsername={setUsername} />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            reenterPassword={reenterPassword}
            setReenterPassword={setReenterPassword}
          />
          <button
            onClick={handleRegister}
            className="bg-blue-500 w-1/4 rounded-md py-2 text-white hover:text-red-400"
          >
            Register
          </button>
          <div className="flex justify-between">
            <Link to="/" className="text-blue-500 hover:text-red-400">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

