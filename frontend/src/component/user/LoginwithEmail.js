import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import {login, clearErrors } from '../../actions/userActions'



const LoginwithEmail = ({history,location}) => {

    const Navigation = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const {isAuthenticatedUser, error} = useSelector(state => state.auth);
    const redirect = typeof window !== 'undefined' && window.location.search ? window.location.search.split('=')[1] : '/';

    useEffect(() => {

        if(isAuthenticatedUser){
            Navigation(redirect)
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }


    },[dispatch,isAuthenticatedUser,error,history,alert,Navigation])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password))
    }


  return (
    <Fragment>
      
    <div className="row wrappers flex justify-center items-center mt-10 h-full mb-8 ">
                      <div className="col-10 col-lg-5 ">
                          <form className="shadow-lg px-6" onSubmit={submitHandler}>
                              <h1 className="mb-6 text-4xl mt-4  text-center font-bold">Login </h1>
                              <div className="form-group">
                                  <label htmlFor="email_field" className="text-lg  mb-2">Email</label>
                                  <input
                                      type="email"
                                      id="email_field"
                                      className="form-control border-gray-300 "
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                  />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="password_field" className="text-lg  mb-2">Password</label>
                                  <input
                                      type="password"
                                      id="password_field"
                                      className="form-control border-gray-300"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                  />
                              </div>
                         
                         <div className="flex justify-evenly items-center mt-4">
                              <Link to="/password/forgot" className=" mb-4 mt-2  lg:px-2 font-bold text-gray-600">Forgot Password?</Link>
                              <Link to="/register" className="  mb-4 mt-2 lg:px-2 font-bold text-gray-600 ">New User?</Link>
                              </div>
                              <button
                                  id="login_button"
                                  type="submit"
                                  className="btn btn-block mb-6 p-2 w-full text-white bg-yellow-600 "
                              >
                                  LOGIN
                              </button>

                             
                          </form>
                      </div>
                  </div>

  </Fragment>
  )
}

export default LoginwithEmail
