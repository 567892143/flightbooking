import React from 'react';
import backgroundImage from './images/bg.jpg';
import backgroundImage1 from './images/WINGS.png';
import { Link } from "react-router-dom";

const YourComponent = () => {
  return (
    <div
      className="h-screen bg-cover bg-center rounded-md  text-9xl text-slate-100"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      WINGS 
      <div>TOURS AND TRAVEL</div>
      <div >want to fly?</div>
      <div className=" absolute top-4 right-4 w-56">
        <img src={backgroundImage1} alt="Logo" className='rounded-full'/>
      </div>
     <Link to='/user-home'> <button className='border-2 bg-gray-800 rounded-md hover:text-black hover:bg-white'>lets fly</button></Link>
    </div>
    
  );
};

export default YourComponent;
