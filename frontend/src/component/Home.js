import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "../product/Product";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { SfScrollable } from "@storefront-ui/react";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./layout/Banner";
import Footer from "./layout/Footer";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const images = [
    "/images/log1.svg",
    "/images/log2.svg",
    "/images/log3.svg",
    "/images/log4.svg",
    "/images/log1.svg",
    "/images/log2.svg",
    "/images/log3.svg",
    // Add more image paths as needed
  ];

  const itemsLength = 10;
  const [activeIndex, setActiveIndex] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, error, productsCount, filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage,minPrice,maxPrice, category));
  }, [dispatch, alert, error, keyword, currentPage, minPrice,maxPrice, category]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval);
  }, []);

  function setCuurentPageNo(pageNo) {
    setCurrentPage(pageNo);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>
      <Banner />

      <div className="mt-6 lg:mt-10 p-2 mx-20">
        <SfScrollable
          wrapperClassName="min-w-0"
          className="items-center w-full"
          activeIndex={activeIndex}
          prevDisabled={activeIndex === 0}
          nextDisabled={activeIndex === itemsLength - 1}
          isActiveIndexCentered
          onPrev={({ preventDefault }) => {
            preventDefault();
            setActiveIndex(
              (prevIndex) => (prevIndex - 1 + images.length) % images.length
            );
          }}
          onNext={({ preventDefault }) => {
            preventDefault();
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
          }}
        >
          {images.map((imagePath, i) => (
            <div
              key={i}
              className={classNames(
                "flex items-center justify-center p-4 lg:p-0 gap-4 w-full lg:w-72 h-20 shrink-0 ",
                i === activeIndex
                  ? "border-solid bg-neutral-200"
                  : "border-dashed bg-neutral-100"
              )}
            >
              <img
                src={imagePath}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover p-1 "
              />
            </div>
          ))}
        </SfScrollable>
      </div>

      <div className="p-8 md:mx-36 lg:mx-40 flex justify-center items-center flex-wrap md:grid grid-cols-3">
        <div className="relative rounded-lg overflow-hidden mt-4">
          <img src="/images/girl2.jpg" className="h-72 w-72 lg:h-96 " alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-2xl font-semibold ">Card Title</h2>
            <p className="text-lg">Card Description</p>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden mt-4 ">
          <img src="/images/boys1.jpg" className="h-72 w-72 lg:h-96 " alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-2xl font-semibold ">Card Title</h2>
            <p className="text-lg">Card Description</p>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden mt-4">
          <img src="/images/heel2.jpg" className="h-72 w-72 lg:h-96 " alt="" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-2xl font-semibold ">Card Title</h2>
            <p className="text-lg">Card Description</p>
          </div>
        </div>
      </div>

      <div>
        <h1
          id="products_heading"
          className="text-center text-4xl mt-6 font-bold"
        >
          Latest Products
        </h1>

        <section
          id="products"
          className="mt-5 flex justify-between items-center "
        >
          {products ? (
            <Fragment>
              <div className="flex justify-between items-center px-4  ">
                <div className="lg:grid lg:grid-cols-4 grid grid-cols-2 gap-4 lg:px-36 ">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <p>No products available</p>
          )}
        </section>
      </div>

      <section className="mt-4  mb-4">
        <div className=""> 
        <img src="/images/banP.png" className="w-full h-96 " alt="" />
        </div>
      </section>

      
    </>
  );
};

export default Home;
