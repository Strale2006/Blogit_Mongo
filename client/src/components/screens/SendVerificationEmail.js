import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './SendVerificationEmail.css';
import axios from 'axios';

function SendVerificationEmail() {
  const [email, setEmail] = useState('');
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");



  const history = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("authToken")){
        history("/login");
    }

    const fetchPrivateData = async () => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        try {
            const {data} = await axios.get("/api/private", config);
            setPrivateData(data);
        }catch (e) {
            localStorage.removeItem("authToken");
            setError("You are not authorized, please login");
        }
    }

    fetchPrivateData().then().catch(error => {
        console.log("Error:", error);
    });
}, [history]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/sendVerificationEmail', { email });
      alert('Email sent');
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2x
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      alert('An error occurred');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history("/login");
}

  return (
    <div className="verification-screen">
            <form className="verification-screen_form form-group">
                {error && <span className="error-message">{error}</span>}
                
                <img src="/SentMail.png" className="verification-screen__logo" alt="Sent Mail"/>
                <h3 className="verification-screen__title">Hi, {privateData.username}</h3>
                <h3 className="verification-screen__title">Verify your email address</h3>
                <span className="verification-screen__subtext">Please verify this email address by clicking the button below</span>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <button type="submit" onClick={handleSubmit} className="verification-button">Verify your email</button>

                <span className="verification-screen__subtext">
                    <button onClick={logoutHandler} className="subtext-link">Logout</button>
                </span>

            </form>
        </div>
  );
}

export default SendVerificationEmail;