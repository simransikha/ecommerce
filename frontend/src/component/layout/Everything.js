import React, {Fragment, useEffect, useState } from "react";
import { getProducts } from "../../actions/productActions";
import Product from  "../../product/Product";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const Everything = () => {

  const [loading, setLoading] = useState(true);
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [category, setCategory] = useState("");
const [keyword, setKeyword] = useState("");

const alert = useAlert();
const dispatch = useDispatch();
const { products, error, productsCount, resPerPage } = useSelector(
  (state) => state.products
);
const { keywords } = useParams();

useEffect(() => {
  if (error) {
    return alert.error(error);
  }

  dispatch(getProducts(keyword || keywords, currentPage, minPrice, maxPrice, category));
  setLoading(false);
}, [dispatch, alert, error, keyword, keywords, currentPage, minPrice, maxPrice, category]);

const handleSearch = (e) => {
  setKeyword(e.target.value);
  setCurrentPage(1);
};

const handlePriceChange = () => {
  setCurrentPage(1);
};

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleCategoryChange = (e) => {
  setCategory(e.target.value);
  setCurrentPage(1);
};

return (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
    <div className="flex justify-center items-center  mb-6">
        <div className="bg-cyan-200 p-4 rounded shadow-md w-full max-w-4xl">
            <div className="flex flex-wrap items-center justify-between">
                <input
                    className="border border-gray-300 rounded px-4 py-2 mb-2 mr-2 flex-grow"
                    type="text"
                    placeholder="Search products"
                    value={keyword}
                    onChange={handleSearch}
                />
                <input
                    className="border border-gray-300 rounded px-4 py-2 mb-2 mr-2"
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    className="border border-gray-300 rounded px-4 py-2 mb-2 mr-2"
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white font-semibold px-4 py-2 mb-2 rounded"
                    onClick={handlePriceChange}
                >
                    Apply Price Filter
                </button>
                <select
                    className="border border-gray-300 rounded p-2 mb-2"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Everything</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Accessories">Accessories</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
        </div>
    </div>

    <div>
        {products ? (
            <div className="grid justify-center items-center p-4 lg:grid-cols-4  sm:grid-cols-2 gap-6 px-4 lg:px-20">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500">No products available</p>
        )}
    </div>

    <div className="flex  justify-center mt-6">
        {Array.from({ length: Math.ceil(productsCount / resPerPage) }, (_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${
                    currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                }`}
            >
                {index + 1}
            </button>
        ))}
    </div>
</div>
          
    
   
     
  );
};

export default Everything

