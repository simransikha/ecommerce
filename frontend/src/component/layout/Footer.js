import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full  mt-4">
      <div className="border-1 border-gray-500 w-full mt-4"></div>
      <div className=" mt-6 mb-6">
        <h1 className="px-10 text-md md:text-2xl lg:text-2xl text-black font-bold">
          SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS
        </h1>
      </div>
      <div className="border-1 border-gray-500 w-full mt-4"></div>
      <div className="px-6 lg:px-16 mt-4 mb-3  grid grid-cols-2 lg:grid-cols-4">
        <div>
        <Link to="/">
                <img
                  src="/images/logo5.png"
                  className="md:w-24 w-20 lg:w-24 h-20 "
                  alt=""
                />
              </Link>
              <h1 className="font-semibold text-black text-md lg:text-xl">The Best Look Anytime, Anywhere.</h1>
        </div>
        <div className="lg:px-10">
          <ul className="gap-2 mt-4">
            <li className="text-black font-semibold text-lg lg:text-2xl">For Her</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Women Jeans</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Tops & Tshirt</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Women Jacket</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Heels & Flats</li>
          </ul>
        </div>
        <div>
        <ul className="gap-2 mt-4">
            <li className="text-black font-semibold text-lg lg:text-2xl">For Him</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Men Jeans</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Men Shirt</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Men Jacket</li>
            <li className="text-gray-500 mt-2 font-semibold text-lg ">Men Shoes</li>
          </ul>
        </div>
        <div className="mt-4">
          <h1 className="text-black font-semibold text-lg lg:text-2xl">Subscribe</h1>
          <input type='text' className="mt-4 border-2 border-gray-600 p-2" placeholder="Your Email Address"/>
         <div>
          <button className="bg-blue-950 text-white p-2 mt-4 rounded-lg"> Subscribe </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
