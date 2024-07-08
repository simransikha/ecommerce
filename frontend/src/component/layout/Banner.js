import React from 'react';

const Banner = () => {

    

  return (
    <div className='w-full  bg-cyan-800  '>
     <div className='flex justify-around items-center'>
      <div className='p-2 md:ml-28 ml-10 '>
        <h1 className='text-white text-xl md:text-5xl'>Raining Offer For <br/>Hot Summer!</h1>
        <h2 className='text-white text-xl md:text-5xl mt-3'>25 % OFF On all Products</h2>
        <button className='p-1 lg:p-3 lg:text-lg text-sm text-white rounded-lg border-2 border-white mt-3'>SHOP MORE</button>
      </div>
      <div>
        <img src='/images/ban2.png' className='h-96' alt=''/>
      </div>
     </div>
   
   
       
</div>

  )
}



export default Banner
