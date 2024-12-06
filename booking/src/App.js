import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const areas = ["Area 1", "Area 2", "Area 3", "Area 4"];
  const timeslots = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM"];

  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem('reservations');
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  // Save reservations to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!name || !contact || !selectedArea || !selectedTime) {
      alert("Please fill in all fields");
      return;
    }

    // Check if the selected time and area are already booked
    const isAlreadyBooked = reservations.some(
      (reservation) =>
        reservation.area === selectedArea && reservation.time === selectedTime
    );

    if (isAlreadyBooked) {
      alert("This time slot is already booked.");
      return;
    }

    // Create a new reservation object
    const newReservation = {
      name,
      contact,
      area: selectedArea,
      time: selectedTime
    };

    // Add the new reservation to the list
    setReservations((prevReservations) => [...prevReservations, newReservation]);

    // Clear the input fields
    setName('');
    setContact('');
    setSelectedArea('');
    setSelectedTime('');

    alert("Your reservation was successfully made!");
  };

  // Function to delete all reservations
  const handleDeleteAll = () => {
    setReservations([]);
    localStorage.removeItem('reservations');
    alert("All reservations have been deleted");
  };

  return (
    <div>
      <h1>Conservation Area Reservation System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Contact Information:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your contact information"
          />
        </div>
        <div>
          <label>Conservation Area:</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">Select Area</option>
            {areas.map((area, index) => (
              <option key={index} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Reservation Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time</option>
            {timeslots.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <button type="submit">Reserve</button>
      </form>

      <h2>Existing Reservations:</h2>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            {reservation.name} - {reservation.contact} | {reservation.area} | {reservation.time}
          </li>
        ))}
      </ul>

      {/* Delete All Button */}
      <button onClick={handleDeleteAll}>Delete All Reservations</button>
    </div>
  );
};

export default App;