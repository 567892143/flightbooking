import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import backgroundImage from './images/WINGS.png';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent. Check your inbox.");
        setSuccessMessage("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        console.error("Sending password reset email failed:", error);
        setErrorMessage("Sending password reset email failed. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-600">
         <div className="absolute top-4 left-4 w-56 ">
        <img src={backgroundImage} alt="Logo" className='rounded-full'/>
      </div>
      <div className="border border-gray-300 p-6 rounded-md bg-slate-200 ">
        <h1 className="text-2xl font-extrabold mb-4">Forgot Password</h1>
        <div className="mb-4">
          <label className="block">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleResetPassword}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send Reset Email
        </button>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Link to="/" className="text-blue-500  hover:text-blue-700 underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;