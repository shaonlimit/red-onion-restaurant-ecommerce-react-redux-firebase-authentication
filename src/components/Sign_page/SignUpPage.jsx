import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo2.png';
import { FormInputData } from '../../JSON_data/FormInputData';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig/firebase';

const SignUpPage = () => {
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const [passwordMessage, setPasswordMessage] = useState('');

  const signUpUser = (e) => {
    e.preventDefault();
    if (inputValues.password !== inputValues.confirmPassword) {
      setPasswordMessage('Password does not match');
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      inputValues.email,
      inputValues.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formInputData = FormInputData.slice(0, 4);
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='sign-up bg-white rounded shadow  p-8 w-fit'>
        <img src={logo} alt='' className='w-64 mb-16' />
        {/* Signup form */}

        <form action='' onSubmit={signUpUser}>
          <div className='input flex flex-col'>
            {formInputData.map((input, index) => (
              <input
                className='bg-slate-100 mb-4 p-2 rounded focus:outline-none'
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                required
                onChange={handleChange}
              />
            ))}
          </div>
          {passwordMessage && (
            <p className='text-center mb-2 text-sm text-red-700'>
              {passwordMessage}
            </p>
          )}
          {/* button */}
          <div className=' w-full'>
            <button
              type='submit'
              className=' inline-block p-2 px-12 bg-primary-color rounded w-full text-white font-medium'
            >
              Sign Up
            </button>
          </div>
        </form>

        <Link to='/sign-in'>
          <p className='text-sm text-red-700 text-center mt-3'>
            Already have an account?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;