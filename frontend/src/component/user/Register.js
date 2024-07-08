import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from "react-redux";
import {register, clearErrors } from '../../actions/userActions'

const Register = ({history}) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password} = user;

    const [avatar,setAvatar] = useState('');
    const[avatarPreview,setAvatarPreview] = useState('/images/logo.png')

    const Navigation = useNavigate();


    const alert = useAlert();
    const dispatch = useDispatch();

    const {isAuthenticatedUser, error} = useSelector(state => state.auth);

    useEffect(() => {

        if(isAuthenticatedUser){
            Navigation('/')
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }


    },[dispatch,isAuthenticatedUser,error,history,alert,Navigation])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('password',password);
        formData.set('avatar',avatar);
       
        dispatch(register(formData))
    }

 const onChange = e => {
    if(e.target.name === 'avatar'){

        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }
    else{
    
        setUser({...user,[e.target.name]:e.target.value})
    }
 }



  return (
    <Fragment>
        <div className="row wrapper flex justify-center items-center mt-10 h-full mb-8">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg px-6" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-6 text-4xl mt-4   font-bold">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field" className="text-lg  mb-2">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control border-gray-300 "
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field" className="text-lg  mb-2">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control border-gray-300 "
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field" className="text-lg  mb-2">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control border-gray-300 "
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <figure className='avatar mr-3 font-lg'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle size-44'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label px-2' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block mb-6 p-2 w-full text-white bg-yellow-600 "
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

    </Fragment>
  )
}

export default Register
