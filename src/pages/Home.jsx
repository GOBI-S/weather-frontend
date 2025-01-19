import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Home = () => {
  // State to manage form data and suggestions
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // To track if the user has started typing

  const URI = import.meta.env.VITE_API_URL; // Use the environment variable
  console.log(URI);

  // Function to fetch address suggestions from Nominatim API
  const fetchAddressSuggestions = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&addressdetails=1&limit=5`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch address suggestions");
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounced input handler for the address input
  const handleAddressInput = (event) => {
    const query = event.target.value.trim();
    setAddress(query); // Update the address input as the user types
    setIsTyping(true); // User started typing

    if (query.length > 2) {
      fetchAddressSuggestions(query);
    } else {
      setSuggestions([]); // Clear suggestions if the query is too short
    }
  };

  // Function to handle address suggestion selection
  const selectSuggestion = (selectedAddress) => {
    setAddress(selectedAddress); // Update the input with the selected address
    setSuggestions([]); // Clear suggestions after selection
    setIsTyping(false); // Stop showing "No suggestions" message
  };

  // Function to handle email verification
  const handleVerifyEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsVerified(true);
      alert("Email has been verified");
    } else {
      alert("Invalid email. Please enter a valid email address.");
    }
  };

  // Function to send email and address data to the server
  const sendData = async () => {
    if (!email || !address) {
      alert("Please provide both email and address before submitting.");
      return;
    }

    setIsSubmitting(true); // Show loading state

    try {
      const response = await axios.post(`${URI}/email`, {
        Email: email,
        address: address,
      });
      alert("Email and address added successfully!");
      console.log("Success:", response.data);
    } catch (error) {
      alert("Failed to submit. Try again.");
      console.error("Error:", error.message);
    } finally {
      setIsSubmitting(false); // Reset the button text and state
    }
  };

  return (
    <div id="box">
      <form id="userForm" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input
            type="email"
            id="E-mail"
            className="input"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="button"
            id="verifybutton"
            className="button"
            onClick={handleVerifyEmail}
          >
            {isVerified ? "Verified" : "Verify"}
          </button>
        </div>
        <div id="locationmap">
          <input
            type="text"
            id="addressInput"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressInput}
            autoComplete="off"
          />
          <div id="suggestions" className="suggestions">
            {isTyping &&
              address.trim().length > 2 &&
              suggestions.length === 0 && (
                <div className="no-results">No suggestions found.</div>
              )}
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectSuggestion(suggestion.display_name)}
                onKeyDown={(e) =>
                  e.key === "Enter" && selectSuggestion(suggestion.display_name)
                }
                tabIndex="0"
              >
                {suggestion.display_name}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          id="launch"
          className="button"
          onClick={sendData}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Home;
