import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import backgroundImage from './images/WINGS.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import {Link} from 'react-router-dom';
const popularCities = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Lucknow', label: 'Lucknow' },
];

const AdminHome = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    departureCity: null,
    arrivalCity: null,
    maxTicketCount: '',
    date: new Date(), // Initialize with current date
    time: '00:00', // Initialize with a default time
    price: ''
  });
  const [ticketsBooked, setTicketsBooked] = useState({});

  useEffect(() => {
    const unsubscribe = db.collection('flights').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFlights(data);
    });

    const fetchTicketsBooked = async () => {
      const snapshot = await db.collection('tickets').get();
      const data = snapshot.docs.reduce((acc, doc) => {
        const { flightId, tickets } = doc.data();
        if (acc[flightId]) {
          acc[flightId] += tickets.length;
        } else {
          acc[flightId] = tickets.length;
        }
        return acc;
      }, {});
      setTicketsBooked(data);
    };

    fetchTicketsBooked();

    return () => unsubscribe();
  }, []);

  const handleInputChange = (name, value) => {
    setNewFlight(prevFlight => ({
      ...prevFlight,
      [name]: value
    }));
  };

  const handleAddFlight = async () => {
    const {
      flightNumber,
      departureCity,
      arrivalCity,
      maxTicketCount,
      date,
      time,
      price
    } = newFlight;

    if (
      flightNumber.trim() !== '' &&
      departureCity !== null &&
      arrivalCity !== null &&
      maxTicketCount.trim() !== '' &&
      price.trim() !== ''
    ) {
      try {
        await db.collection('flights').add({
          flightNumber,
          departureCity: departureCity.value,
          arrivalCity: arrivalCity.value,
          maxTicketCount: parseInt(maxTicketCount),
          date: firebase.firestore.Timestamp.fromDate(date),
          time,
          price: parseFloat(price)
        });
        setNewFlight({
          flightNumber: '',
          departureCity: null,
          arrivalCity: null,
          maxTicketCount: '',
          date: new Date(),
          time: '00:00',
          price: ''
        });
      } catch (error) {
        console.error('Error adding flight:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRemoveFlight = async flightId => {
    const confirmRemove = window.confirm('Are you sure you want to remove this flight?');
    if (confirmRemove) {
      try {
        await db.collection('flights').doc(flightId).delete();
      } catch (error) {
        console.error('Error removing flight:', error);
      }
    }
  };

  return (
    <div className=" mx-auto ">
      <header className="bg-slate-600 text-white py-4 rounded-md">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="absolute top-4 left-4  w-10">
              <img src={backgroundImage} alt="Logo" className="rounded-full" />
            </div>
            <h1 className="text-2xl font-bold pl-9">Wings tours and travel</h1>
          </div>
          <div>
          <Link to="/" > <button className="btn-primary bg-blue-400 rounded-sm hover:text-red-400 ml-2">
              Sign out
            </button></Link>
          </div>
        </div>
      </header>
      <h1 className="text-2xl font-bold mb-4 justify-center items-center flex ">Admin Home</h1>

      <div className="grid grid-cols-2 gap-4 mb-4 border-2 border-black">
        <h1 className='flex items-center justify-center font-bold text-3xl'>ADD FLIGHTS HERE</h1>
        <input
          type="text"
          name="flightNumber"
          value={newFlight.flightNumber}
          onChange={e => handleInputChange('flightNumber', e.target.value)}
          placeholder="Flight Number"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        />
        <Select
          name="departureCity"
          value={newFlight.departureCity}
          onChange={selectedOption => handleInputChange('departureCity', selectedOption)}
          options={popularCities}
          placeholder="Departure City"
          className="border border-gray-300 rounded px-2 py-1"
        />
        <Select
          name="arrivalCity"
          value={newFlight.arrivalCity}
          onChange={selectedOption => handleInputChange('arrivalCity', selectedOption)}
          options={popularCities}
          placeholder="Arrival City"
          className="border border-gray-300 rounded px-2 py-1"
        />
        <input
          type="text"
          name="maxTicketCount"
          value={newFlight.maxTicketCount}
          onChange={e => handleInputChange('maxTicketCount', e.target.value)}
          placeholder="Max Ticket Count"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        />
        <div className="flex items-center">
          <DatePicker
            selected={newFlight.date}
            onChange={date => handleInputChange('date', date)}
            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // Set minimum date to tomorrow
            placeholderText="Date"
            className="border border-gray-300 rounded px-2 py-1"
          />
          <TimePicker
            value={newFlight.time}
            onChange={time => handleInputChange('time', time)}
            disableClock={true}
            clearIcon={null}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          />
        </div>
        <input
          type="text"
          name="price"
          value={newFlight.price}
          onChange={e => handleInputChange('price', e.target.value)}
          placeholder="Price"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        />
        <div></div>
        <button
          onClick={handleAddFlight}
          className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded focus:outline-none"
        >
          Add Flight
        </button>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-2">Flights(you can remove flights from here)</h2>
      <ul className="space-y-2">
        {flights.map(flight => (
            
          <li key={flight.id} className="border border-gray-300 rounded p-4 flex justify-between items-center">
            <span>
              {flight.flightNumber} - {flight.departureCity} to {flight.arrivalCity} (
                )
            </span>
            <button
              onClick={() => handleRemoveFlight(flight.id)}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              Remove
            </button>
          </li>
      
        ))}
      </ul>
      <footer className="bg-[#282a35] py-8 h-[320px] border-radius-[30px] rounded-md">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col">
          <img className="h-16 w-16  mr-auto ml-8 mb-2 mt-2 " src={backgroundImage} alt="Logo" />
          <p className="text-gray-200 leading-loose ml-8 mt-8">
            wings<br />
            Phone: +91 9948092723<br />
            Email: 20211a04n5@bvrit.ac.in
          </p>
        </div>
        <div className="flex flex-row">
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 pr-4">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="container mx-auto text-center text-gray-500 mt-4">
        <p>&copy; 2023 wings Company. All rights reserved.</p>
      </div>
    </footer>
    
    </div>
  );
};

export default AdminHome;