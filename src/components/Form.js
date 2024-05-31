import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./FormComponent.css";

const FormComponent = () => {
  const initialFormData = {
    name: "",
    email: "",
    parent_name: "",
    phone: "",
    gender: "",
    currentAddressType: "",
    address: "",
    state: "",
    district: "",
    country: "",
    occupation: "",
    native_district: "",
    agreedToTerms: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [indianStates, setIndianStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    setIndianStates([
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ]);

    setCountries([
      "United States",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "India",
      "China",
      "Japan",
      "Brazil",
      "United Kingdom",
      "Russia",
      "South Africa",
    ]);
  }, []);

  useEffect(() => {
    if (formData.state) {
      const districtsByState = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
        "Arunachal Pradesh": ["Itanagar", "Tawang", "Naharlagun", "Pasighat"],
        Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
        Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Bhilai"],
        Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
        Haryana: ["Gurgaon (Gurugram)", "Faridabad", "Panchkula", "Ambala"],
        "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
        Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City"],
        Karnataka: [
          "Bengaluru",
          "Mysore (Mysuru)",
          "Mangalore (Mangaluru)",
          "Hubli-Dharwad",
        ],
        Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
        Manipur: ["Imphal", "Churachandpur", "Thoubal", "Bishnupur"],
        Meghalaya: ["Shillong", "Tura", "Nongpoh", "Jowai"],
        Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai"],
        Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
        Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
        Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
        Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
      };
      setDistricts(districtsByState[formData.state] || []);
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.country && formData.country !== "India") {
      const statesByCountry = {
        "United States": ["California", "Texas", "New York", "Florida"],
        Canada: ["Ontario", "Quebec", "British Columbia"],
        Australia: [
          "New South Wales",
          "Victoria",
          "Queensland",
          "Western Australia",
        ],
        Germany: [
          "Bavaria (Bayern)",
          "Baden-Württemberg",
          "North Rhine-Westphalia (Nordrhein-Westfalen)",
          "Hesse (Hessen)",
        ],
        France: [
          "Île-de-France",
          "Provence-Alpes-Côte d'Azur",
          "Nouvelle-Aquitaine",
          "Auvergne-Rhône-Alpes",
        ],
        India: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "West Bengal"],
        China: ["Guangdong", "Sichuan", "Jiangsu", "Shandong"],
        Japan: ["Tokyo", "Osaka", "Kyoto", "Hokkaido"],
        Brazil: ["São Paulo", "Rio de Janeiro", "Bahia", "Paraná"],
        "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
        Russia: [
          "Moscow",
          "Saint Petersburg",
          "Siberia (Siberian Federal District)",
          "Tatarstan",
        ],
        "South Africa": [
          "Gauteng",
          "Western Cape",
          "KwaZulu-Natal",
          "Eastern Cape",
        ],
      };
      setStates(statesByCountry[formData.country] || []);
    } else {
      setStates([]);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch(
        "https://form-c27i.onrender.com/api/forms/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData(initialFormData);
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const isSubmitDisabled = !formData.agreedToTerms;

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent_name">S/o, W/o, D/o:</label>
          <input
            type="text"
            id="parent_name"
            name="parent_name"
            value={formData.parent_name}
            onChange={handleChange}
            placeholder="Enter parent's name"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Mobile Number:</label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputStyle={{ width: "100%" }}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Current Address:</label>
        <div className="radio-group">
          <input
            type="radio"
            id="addressIndia"
            name="currentAddressType"
            value="india"
            checked={formData.currentAddressType === "india"}
            onChange={handleChange}
          />
          <label htmlFor="addressIndia">India</label>
          <input
            type="radio"
            id="addressAbroad"
            name="currentAddressType"
            value="abroad"
            checked={formData.currentAddressType === "abroad"}
            onChange={handleChange}
          />
          <label htmlFor="addressAbroad">Abroad</label>
        </div>
      </div>
      {formData.currentAddressType && (
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>
          {formData.currentAddressType === "india" && (
            <>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {formData.state && (
                <div className="form-group">
                  <label htmlFor="district">District:</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
          {formData.currentAddressType === "abroad" && (
            <>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {formData.country && formData.country !== "India" && (
                <div className="form-group">
                  <label htmlFor="state">State:</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <div className="form-group">
        <h2>Native Address in Rajasthan</h2>
      </div>
      <div className="form-group">
        <label htmlFor="native_district">District:</label>
        <input
          type="text"
          id="native_district"
          name="native_district"
          value={formData.native_district}
          onChange={handleChange}
          placeholder="Enter your district"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="occupation">Occupation:</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          placeholder="Enter your occupation"
        />
      </div>
      <div className="form-group terms">
        <input
          type="checkbox"
          id="agreedToTerms"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          required
        />
        <label htmlFor="agreedToTerms" className="terms-label">
          By submitting this form, I consent to Founder General Secretary of
          MARWADI INTERNATIONAL FEDERATION (MIF) for using my name and details
          for records of MIF and its office bearers list. I have read and
          understood all the terms and conditions of MIF.
        </label>
      </div>
      <div className="buttons-container">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="submit-button"
        >
          Submit
        </button>
        <button type="reset" className="reset-button">
          Reset
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
