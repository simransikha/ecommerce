import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "../style.css";
import "../../App.css";

import { logout } from "../../actions/userActions";


const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully.");
  };

  return (
    <Fragment>
      <div className="w-full bg-cyan-600 ">
        <div className="flex justify-around    items-center px-2 lg:px-24">
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <div className="mb-3 ">
              <Link to="/">
                <img
                  src="/images/logo5.png"
                  className="md:w-24 w-20 lg:w-24 h-20 "
                  alt=""
                />
              </Link>
            </div>
            <div>
              <ul className="lg:flex  hidden justify-center items-center gap-6 text-blue-200 font-semibold text-lg">
                <li>
                  <a href="/everything">Everything</a>
                </li>
                <li>
                  <a href="https://example.com/about">Women</a>
                </li>
                <li>
                  <a href="https://example.com/products">Men</a>
                </li>
                <li>
                  <a href="https://example.com/contact">Accessories</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 lg:gap-4  text-blue-200 font-semibold text-lg">
            <div className="hover:text-blue-800 hover:underline hidden lg:flex"><a href="/about">About</a></div>
            <div className="hover:text-blue-800 hover:underline hidden lg:flex ml-4"><a href="/contact">Contact Us</a>                            
            </div>
            <div className="flex items-center justify-center gap-2  lg:gap-6">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <i class="fa-solid fa-cart-shopping text-lg text-blue-200 rounded-sm px-2 ml-2 lg:px-4">
                </i>
                <span className="text-white text-xs mb-4 rounded-full  p-1 bg-blue-900/20 ">
                  {cartItems.length}
                </span>
              </Link>

              {user ? (
                <div className="lg:ml-4 ml-2 dropdown  d-inline">
                  <Link
                    to="#!"
                    className="btn dropdown-toggle  text-blue-200 mr-4 lg:mr-4 flex justify-center items-center gap-1 lg:gap-2 "
                    type="button"
                    id="dropDownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <figure className="avatar  flex justify-center items-center">
                      <img
                        src={user.avatar && user.avatar.url}
                        alt={user && user.name}
                        className="rounded-circle size-8"
                      />
                    </figure>

                    <span>{user && user.name}</span>
                  </Link>

                  <div
                    className="dropdown-menu  "
                    aria-labelledby="dropDownMenuButton"
                  >
                    {user && user.role === "admin" && (
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    )}
                    <Link className="dropdown-item" to="/orders/me">
                      Orders
                    </Link>
                    <Link className="dropdown-item" to="/me">
                      Profile
                    </Link>
                    <Link
                      className="dropdown-item text-danger"
                      to="/"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                !loading && (
                  <Link to="/signIn" className="btn ml-4" id="login_btn">
                    Login
                  </Link>
                )
              )}
            </div>
            <div className="block lg:hidden"><button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
        </div>
          </div>
        </div>
      
      
         <div
       className={`w-full  block flex-grow lg:hidden  ${isOpen ? "block" : "hidden"}`}
     >
         <div className="fixed md:hidden right-0 top-24 z-50 w-[60%] h-full border-r border-r-gray-900 bg-cyan-950 text-left p-3 ease-in-out duration-500">
          <div className="">

          <ul className=" mt-4 p-2 justify-center items-center gap-6 text-white font-semibold text-lg">
                <li className="bg-blue-200/15 p-1 text-center w-full hover:bg-blue-950/15">
                  <a href="/everything" >Everything</a>
                </li>
                <li className="bg-blue-200/15 p-1 text-center w-full mt-2 hover:bg-blue-950/15">
                  <a href="https://example.com/about">Women</a>
                </li>
                <li className="bg-blue-200/15 p-1 text-center w-full mt-2 hover:bg-blue-950/15">
                  <a href="https://example.com/products">Men</a>
                </li>
                <li className="bg-blue-200/15 p-1 text-center w-full mt-2 hover:bg-blue-950/15">
                  <a href="https://example.com/contact">Accessories</a>
                </li>
              </ul>
          </div>
          <div>
          <ul className="lg:hidden  justify-center items-center gap-6 mt-8 mb-4 text-white font-semibold text-lg">
                <li className="bg-blue-200/15 p-1 text-center w-full mt-4 hover:bg-blue-950/15">
                  <a href="about">About</a>
                </li>
                <li className="bg-blue-200/15 p-1 text-center w-full mt-2 hover:bg-blue-950/15">
                  <a href="contact" >Contact Us</a>
                </li>
                
              </ul>
          </div>
        
          </div>

        </div>



      </div>
    </Fragment>
  );
};

export default Header;
