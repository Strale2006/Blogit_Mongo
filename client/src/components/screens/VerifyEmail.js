import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { verificationToken } = useParams();

  const history = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth/verifyEmail/${verificationToken}`);
        alert('Email verified');
        history('/');
      } catch (error) {
        console.error(error);
        alert('An error occurred');
      }
    };

    verifyEmail().then(r => console.log(r));
  }, [verificationToken]);

  return <div>Email verification in progress...</div>;
}

export default VerifyEmail;