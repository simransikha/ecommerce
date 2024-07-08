import React, { Fragment } from "react";
import { Link } from "react-router-dom";



const Login = () => {
    

  return (
    <Fragment>
      
      <div className="row wrappers flex justify-center items-center mt-10 h-full mb-8 ">
                        <div className="col-10 col-lg-5 ">
                            <form className="shadow-lg px-6">
                                <h1 className="mb-6 text-4xl mt-6 text-center    font-bold">Login</h1>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block mb-6 p-2 mt-4 w-full text-white bg-yellow-600 "
                                ><Link to='/login'>
                                    LOGIN In With Email
                                    </Link>
                                </button>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block mb-6 mt-4 p-2 w-full text-white bg-yellow-600 "
                                ><Link to='/loginwithPhone'>
                                    LOGIN In With PhoneNo
                                    </Link>
                                </button>
                               
                            </form>
                        </div>
                    </div>

    </Fragment>
  )
}

export default Login
