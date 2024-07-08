import React from "react";

const About = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-full h-full ">
          <img src="/images/aboutban.jpg" className="h-96 w-full" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-black">About Us</h1>
          </div>
        </div>
      </div>

      <div className=" w-full border-1 border-gray-200 bg-slate-300 ">
        <div className="lg:p-10  p-4 flex-wrap md:mx-14  md:my-4 md:grid grid-cols-2">
          <div className="px-6 lg:px-16  flex justify-center items-center flex-col bg-white">
            <h1 className="text-3xl md:text-5xl font-bold mt-4 ">WHO WE ARE</h1>
            <span className="mt-4 text-gray-900 text-lg font-semibold md:text-xl mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              maiores omnis vero qui! Iusto consectetur nisi sequi recusandae,
              architecto delectus!
            </span>
          </div>
          <div>
            <img src="/images/ban6.jpg" className=" w-full" alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-10">
        <div className="border-2 border-blue-500 w-24 mt-7"></div>
        <h1 className="text-2xl font-medium text-black mt-3">
          A Few Words About
        </h1>
        <h1 className="text-5xl font-bold text-black mt-2">Our Team</h1>
        <span className="text-black mt-4 mx-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          adipisci illum assumenda alias{" "}
          <div className="md:flex justify-center items-center">
            {" "}
            similique fugit esse earum, libero modi at?
          </div>
        </span>
        <div className="">
          <div className="flex-wrap  md:grid grid-cols-3 mt-6 gap-12 p-4 ">
            <div className="bg-slate-300 rounded-lg mb-4 border-gray-600 flex flex-col justify-center items-center w-full h-full p-4 md:p-8 ">
                    <div className="p-4 ">
                    <img src="/images/team2.jpeg" className="rounded-full w-28 h-28" alt="" />
                    </div>
                    <h1 className="text-2xl font-bold text-black mt-2">Simran Sikha</h1>
                    <h2 className="text-md font-medium text-black mt-2">Founder-CEO</h2>
            </div>
            <div className="bg-slate-300 rounded-lg mb-4 border-gray-600 flex flex-col justify-center items-center w-full h-full p-4 md:p-8">
                    <div className="p-4 ">
                    <img src="/images/team1.jpeg" className="rounded-full w-28 h-28" alt="" />
                    </div>
                    <h1 className="text-2xl font-bold text-black mt-2">Vivek Anand</h1>
                    <h2 className="text-md font-medium text-black mt-2">CEO</h2>
            </div>
            <div className="bg-slate-300 rounded-lg mb-4 border-gray-600 flex flex-col justify-center items-center w-full h-full p-4 md:p-8 ">
                    <div className="p-4 ">
                    <img src="/images/boys1.jpg" className="rounded-full w-28 h-28" alt="" />
                    </div>
                    <h1 className="text-2xl font-bold text-black mt-2"> Sikha</h1>
                    <h2 className="text-md font-medium text-black mt-2">Marketing-Head</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:px-32 gap-10 mt-6 lg:mt-14 mb-16">
        <div className="flex-wrap justify-center items-center md:grid grid-cols-4">
          <div className="flex flex-col justify-center items-center">
            <div><i class="fa-solid fa-globe h-20 w-10"></i></div>
            <h1 className="text-xl">Worldwide Shipping</h1>
            <span className="text-md text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper</span>
            <div className="text-md text-gray-500">mattis, pulvinar dapibus leo.</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div><i class="fa-solid fa-thumbtack h-20 w-10"></i></div>
            <h1 className="text-xl">Best Quality</h1>
            <span className="text-md text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper</span>
            <div className="text-md text-gray-500">mattis, pulvinar dapibus leo.</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div><i class="fa-solid fa-lock h-20 w-10"></i></div>
            <h1 className="text-xl">Secure Payments</h1>
            <span className="text-md text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper</span>
            <div className="text-md text-gray-500">mattis, pulvinar dapibus leo.</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div><i class="fa-solid fa-tag h-20 w-10"></i></div>
            <h1 className="text-xl">Best Offers</h1>
            <span className="text-md text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper</span>
            <div className="text-md text-gray-500">mattis, pulvinar dapibus leo.</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
