import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // Check if product or product.images is undefined/null or empty
 

  return (
    <Fragment>
      <div className=" mt-4 flex flex-wrap lg:grid grid-cols-4 ">

        <div className="bg-cyan-950/15 border-2 border-gray-300 rounded-2xl w-44  ">
          <div className="flex justify-center items-center">
          <img src={product.images[0].url} className="p-2 rounded-lg h-40" alt=''/>
          </div>
          <h1 className="text-center text-black text-xl"> <Link to={`/product/${product._id}`}>{product.name}</Link></h1>
          <p className="text-center text-md text-black">{product.description}</p>
           <div className="flex justify-around items-center p-1 lg:p-2 ">
           <h1 className="lg:text-lg text-sm  text-blue-950 font-bold ">${product.price}</h1>
          <Link to={`/product/${product._id}`} className="bg-cyan-950 text-white p-2 text-base rounded-2xl ">View Details</Link>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default Product;
