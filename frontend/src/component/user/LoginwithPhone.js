import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

import { auth } from '../firebase/firebase';

const LoginwithPhone = () => {
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState();
const [otp,setOtp] = useState();
  const sendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-div', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('r',response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setVerificationId(verificationId);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOtp = async () => {
      
    

    try {
      verificationId.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
      console.log(error)
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  

  return (
    <div className='Signin flex justify-center items-center h-64'>
      <div className='border-1 border-gray-600'>
        <div className='p-4 gap-2'>
          <PhoneInput
            className='p-2'
            placeholder="Enter phone number"
            value={phone}
            onChange={(value) => {
              setPhone(value)
            }}
          />
        </div>
        <div className='flex justify-center items-center'>
          <Button onClick={sendOtp}>Send OTP</Button>
        </div>
        <div id="recaptcha-div"></div>
        <div className='flex justify-center items-center p-2 gap-4 mt-4'>
          <input
            className='p-2'
            placeholder="Enter OTP"
            value={otp} // Clear the value after verifying OTP
            onChange={(event) => {
              setOtp(event.target.value)
            }} // Empty onChange handler
            defaultCountry="US" // Set default country code if necessary
          />
          <Button onClick={() => verifyOtp()}>Verify OTP</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginwithPhone;
