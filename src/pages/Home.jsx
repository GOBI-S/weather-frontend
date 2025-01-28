import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Home = () => {
  const cityData = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Bhopal",
    "Chandigarh",
    "Coimbatore",
    "Indore",
    "Patna",
    "Visakhapatnam",
    "Nagpur",
    "Kanpur",
    "Vadodara",
    "Varanasi",
    "Mysore",
    "Jodhpur",
    "Ranchi",
    "Kochi",
    "Agra",
    "Goa",
    "Udaipur",
    "Rishikesh",
    "Darjeeling",
    "Leh",
    "Munnar",
    "Manali",
    "Guwahati",
    "Shillong",
    "Thiruvananthapuram",
    "Bhubaneswar",
    "Amritsar",
    "Prayagraj",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Surendranagar",
    "Aligarh",
    "Meerut",
    "Moradabad",
    "Bareilly",
    "Gorakhpur",
    "Ghaziabad",
    "Faridabad",
    "Panipat",
    "Sonipat",
    "Rohtak",
    "Hisar",
    "Ambala",
    "Muzaffarpur",
    "Gaya",
    "Bhagalpur",
    "Dhanbad",
    "Bokaro",
    "Jamshedpur",
    "Siliguri",
    "Asansol",
    "Durgapur",
    "Howrah",
    "Kalyani",
    "Alappuzha",
    "Kollam",
    "Palakkad",
    "Thrissur",
    "Kannur",
    "Kasargod",
    "Pondicherry",
    "Madurai",
    "Salem",
    "Erode",
    "Tiruchirappalli",
    "Tirunelveli",
    "Nashik",
    "Kolhapur",
    "Sangli",
    "Solapur",
    "Ratnagiri",
    "Satara",
    "Nanded",
    "Aurangabad",
    "Beed",
    "Akola",
    "Amravati",
    "Jalgaon",
    "Chandrapur",
    "Yavatmal",
    "Wardha",
    "Guntur",
    "Nellore",
    "Tirupati",
    "Anantapur",
    "Kakinada",
    "Rajahmundry",
    "Vijayawada",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Mahbubnagar",
    "Belagavi",
    "Kalaburagi",
    "Hubli-Dharwad",
    "Davangere",
    "Ballari",
    "Tumakuru",
    "Shimoga",
    "Bidar",
    "Hassan",
    "Raichur",
    "Chitradurga",
    "Vellore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Kanchipuram",
    "Pudukottai",
    "Kanyakumari",
    "Thoothukudi",
    "Arakkonam",
    "Arani",
    "Kumbakonam",
    "Sivakasi",
    "Tiruppur",
    "Villupuram",
    "Sikar",
    "Bikaner",
    "Alwar",
    "Bundi",
    "Kota",
    "Ajmer",
    "Barmer",
    "Pali",
    "Udaipur",
    "Jaisalmer",
    "Jhunjhunu",
    "Hanumangarh",
    "Sri Ganganagar",
  ];

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false); // New state for managing suggestion visibility

  const URI = import.meta.env.VITE_API_URL;

  // Filter city suggestions based on input
  const handleAddressInput = (event) => {
    const input = event.target.value.trim();
    setAddress(input);

    if (input.length > 2) {
      const matches = cityData.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCities(matches);
      setShowSuggestions(true); // Show suggestions when input length is greater than 2
    } else {
      setFilteredCities([]);
      setShowSuggestions(false); // Hide suggestions if input is too short
    }
  };

  // Select a city suggestion
  const selectSuggestion = (city) => {
    setAddress(city);
    setFilteredCities([]); // Clear suggestions
    setShowSuggestions(false); // Hide suggestions after selection
  };

  // Handle email verification
  const handleVerifyEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsVerified(true);
      alert("Email has been verified.");
    } else {
      alert("Invalid email. Please enter a valid email address.");
    }
  };

  // Close suggestions when input loses focus (with a slight delay)
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false); // Hide suggestions after delay
    }, 150);
  };

  // Keep suggestions visible when the input is focused
  const handleFocus = () => {
    if (filteredCities.length > 0) {
      setShowSuggestions(true); // Show suggestions when input is focused
    }
  };

  // Submit email and address data to the server
  const sendData = async () => {
    if (!email || !address) {
      alert("Please provide both email and address before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${URI}/email`, {
        Email: email,
        address,
      });
      alert("Email and address added successfully!");
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        alert("Your email is already added.");
      } else if (error.response?.status === 400) {
        alert("Cannot add your email. Please check the details.");
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="box">
      {/* Background Video */}
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src="/small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Form */}
      <form id="userForm" onSubmit={(e) => e.preventDefault()}>
        {/* Email Input */}
        <div className="input-group">
          <input
            type="email"
            id="email"
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

        {/* Address Input with Suggestions */}
        <div id="locationmap">
          <input
            type="text"
            id="addressInput"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressInput}
            autoComplete="off"
            onFocus={handleFocus} // Show suggestions on focus
            onBlur={handleBlur} // Hide suggestions on blur
          />
          {showSuggestions && address && (
            <ul className="listaddress">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="items"
                    onClick={() => selectSuggestion(city)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) =>
                      e.key === "Enter" && selectSuggestion(city)
                    }
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No matches found</li>
              )}
            </ul>
          )}
        </div>

        {/* Submit Button */}
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
