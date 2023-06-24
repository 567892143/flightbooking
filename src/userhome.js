import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { db } from './firebase';
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

const FlightSearch = () => {
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [date, setDate] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [showUserBookings, setShowUserBookings] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      handleViewBookings(user.email);
    }
  }, []);

  const handleSearch = () => {
    db.collection('flights')
      .where('departureCity', '==', departureCity.value)
      .where('arrivalCity', '==', arrivalCity.value)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(data);
      })
      .catch(error => {
        console.error('Error searching flights:', error);
      });
  };

  const handleBookNow = flightId => {
    const user = firebase.auth().currentUser;
    if (user) {
      const booking = {
        flightId,
        userEmail: user.email,
        bookingTime: new Date().toISOString(),
      };
      db.collection('bookings')
        .add(booking)
        .then(() => {
          console.log('Booking successful');
        })
        .catch(error => {
          console.error('Error booking flight:', error);
        });
    }
  };

  const handleViewBookings = userEmail => {
    db.collection('bookings')
      .where('userEmail', '==', userEmail)
      .get()
      .then(snapshot => {
        const bookings = snapshot.docs.map(doc => doc.data());

        // Fetch additional flight details for each booking
        const promises = bookings.map(booking =>
          db.collection('flights').doc(booking.flightId).get()
        );

        Promise.all(promises)
        .then((results) => {
          const bookingsWithFlightDetails = results.map((result, index) => {
            const flightData = result.data();
            if (
              flightData &&
              flightData.flightNumber &&
              flightData.departureCity &&
              flightData.arrivalCity
            ) {
              return {
                ...bookings[index],
                flightNumber: flightData.flightNumber,
                departureCity: flightData.departureCity,
                arrivalCity: flightData.arrivalCity,
              };
            }
            return null; // or handle the case where flight data is missing
          });
          setUserBookings(
            bookingsWithFlightDetails.filter((booking) => booking !== null)
          );
        })
        .catch((error) => {
          console.error('Error fetching flight details:', error);
        });
    });
};


  const handleShowUserBookings = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      handleViewBookings(user.email);
      setShowUserBookings(true);
    }
  };

  return (
    <div className="mx-auto">
      <header className="bg-slate-600 text-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="absolute top-4 left-4  w-10">
              <img src={backgroundImage} alt="Logo" className="rounded-full" />
            </div>
            <h1 className="text-2xl font-bold pl-9">Wings tours and travel</h1>
          </div>
          <div>
           <Link to="/"><button className="btn-primary bg-blue-400 rounded-sm hover:text-red-400 ml-2">
            
              Sign out </button></Link> 
          </div>
        </div>
      </header>
      <h2 className="text-2xl font-bold mb-4">Flight Search</h2>
      <div className="mb-4">
        <label className="mr-2">Departure City:</label>
        <Select
          value={departureCity}
          onChange={selectedOption => setDepartureCity(selectedOption)}
          options={popularCities}
          placeholder="Select Departure City"
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Arrival City:</label>
        <Select
          value={arrivalCity}
          onChange={selectedOption => setArrivalCity(selectedOption)}
          options={popularCities}
          placeholder="Select Arrival City"
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Date:</label>
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
      >
        Search Flights
      </button>

      {searchResults.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Search Results:</h3>
          <ul>
            {searchResults.map(flight => (
              <li key={flight.id}>
                <p>Departure City: {flight.departureCity}</p>
                <p>Arrival City: {flight.arrivalCity}</p>
                <p>Departure Time: {flight.departureTime}</p>
                <p>Arrival Time: {flight.arrivalTime}</p>
                <p>Price: {flight.price}</p>
                <button
                  onClick={() => handleBookNow(flight.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4">No available flights.</p>
      )}

      <div className="mt-4">
        <button
          onClick={handleShowUserBookings}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          View My Bookings
        </button>
      </div>

      {showUserBookings && userBookings.length > 0 && (
  <div className="mt-4">
    <h3 className="text-xl font-bold">My Bookings:</h3>
    <ul>
      {userBookings.map(booking => (
        <li key={booking.id} className="border border-gray-300 p-4 mb-4">
          <p>Flight Number: {booking.flightNumber}</p>
          <p>Departure City: {booking.departureCity}</p>
          <p>Arrival City: {booking.arrivalCity}</p>
          <p>Booking Time: {booking.bookingTime}</p>
        </li>
      ))}
    </ul>
  </div>
)}
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

export default FlightSearch;
