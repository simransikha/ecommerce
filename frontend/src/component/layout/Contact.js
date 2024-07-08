import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/v1/contact', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert('Form submitted successfully!');
            setFormData({ name: '', email: '', contact: '', message: '' });
        }
    } catch (error) {
        alert('Failed to submit the form');
        console.error(error);
    }
};

    
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-full h-full ">
          <img src="/images/contactban.jpg" className="h-96 w-full" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-10">
        <h1 className="text-2xl font-medium text-black mt-3">
          Have any queries?
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          We're here to help.​
        </h1>
        <div className="border-1 border-gray-700 w-24 mt-4"></div>
        <div className="flex justify-center items-center md:mx-24  mt-14 mb-6 ">
          <div className="flex-wrap md:grid grid-cols-4 gap-4 ">
            <div className="flex-col text-center mb-4 rounded-xl p-4 bg-white shadow-lg shadow-gray-500">
              <h1 className="text-2xl font-bold text-black">Sales</h1>
              <h2 className="text-md text-gray-600">
                Vestibulum ante ipsum primis
              </h2>
              <span className="text-md text-gray-600">
                faucibus orci luctus.
              </span>
              <p className="text-xl text-blue-500 font-bold">1800 123 4567</p>
            </div>
            <div className="flex-col text-center rounded-xl mb-4 p-4 bg-white shadow-lg shadow-gray-500">
              <h1 className="text-2xl font-bold text-black">Complaints</h1>
              <h2 className="text-md text-gray-600">
                Vestibulum ante ipsum primis{" "}
              </h2>
              <span className="text-md text-gray-600">
                faucibus orci luctus.
              </span>
              <p className="text-xl text-blue-500 font-bold">1900 223 8899</p>
            </div>
            <div className="flex-col text-center rounded-xl mb-4 p-4 bg-white shadow-lg shadow-gray-500">
              <h1 className="text-2xl font-bold text-black">Returns</h1>
              <h2 className="text-md text-gray-600">
                Vestibulum ante ipsum primis{" "}
              </h2>
              <span className="text-md text-gray-600">
                faucibus orci luctus.
              </span>
              <p className="text-xl text-blue-500 font-bold">
                returns@mail.com
              </p>
            </div>
            <div className="flex-col text-center rounded-xl mb-4 p-4 bg-white shadow-lg shadow-gray-500">
              <h1 className="text-2xl font-bold text-black">Marketing</h1>
              <h2 className="text-md text-gray-600">
                Vestibulum ante ipsum primis{" "}
              </h2>
              <span className="text-md text-gray-600">
                faucibus orci luctus.
              </span>
              <p className="text-xl text-blue-500 font-bold">1700 444 5578</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mx-4 md:mx-20">
        <div className="flex-wrap  md:grid grid-cols-2 gap-10 ">
          <div className="flex-col md:mx-10 text-center  mb-4 md:mt-24 md:mb-10">
            <h1 className="text-black text-md md:text-left">
              Don't be a stranger!
            </h1>
            <h2 className="text-black text-xl md:text-left md:text-3xl font-bold">
              You tell us. We listen.{" "}
            </h2>
            <h1 className="text-lg text-gray-600 md:text-left">
              Cras elementum finibus lacus nec lacinia. Quisque non convallis
              nisl eu condimentum sem. Proin dignissim libero lacus,tellus.
            </h1>
          </div>
          <div>


          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contact No</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded h-24" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full">Submit</button>
      </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
