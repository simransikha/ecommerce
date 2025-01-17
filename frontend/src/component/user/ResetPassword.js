import React, { Fragment, useEffect, useState } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import {resetPassword, clearErrors } from '../../actions/userActions';

const ResetPassword = () => {

    
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const Navigation = useNavigate();
    const params = useParams();

    const alert = useAlert();
    const dispatch = useDispatch();

    const {message, error,loading,success} = useSelector(state => state.forgotPassword);


    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(success){
            alert.success('Updated Successfully')

            Navigation('/login')
        }
        

    },[dispatch,error,alert,success,Navigation])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password',password);
        formData.set('confirmPassword',confirmPassword);

        dispatch(resetPassword(params.token,formData))
    }


  return (
    <Fragment>
      
      <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>


    </Fragment>
  )
}

export default ResetPassword
