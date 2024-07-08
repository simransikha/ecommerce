import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import {updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";


const UpdatePassword = () => {

    const [oldPassword,setOldPassword] = useState('');
    const [password,setPassword] = useState('');
  

    const Navigation = useNavigate();


    const alert = useAlert();
    const dispatch = useDispatch();

    const {isUpdated, loading, error} = useSelector(state => state.user);


    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('Updated Password Successfully');
    

            Navigation('/me')

            dispatch({
                type:UPDATE_PASSWORD_RESET
            })

            }

        

    },[dispatch,isUpdated,error,alert,Navigation])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword',oldPassword);
        formData.set('password',password);
       
        dispatch(updatePassword(formData))
    }


  

  return (
    <Fragment>
      
      <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

    </Fragment>
  )
}

export default UpdatePassword
