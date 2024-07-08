import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from 'react-alert'
import { Carousel } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetails, clearErrors } from "../actions/productActions";
import { addItemToCart} from '../actions/cartActions'


const ProductDetails = () => {

const [quantity,setQuantity] = useState(1)


  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product} = useSelector ( state => state.productDetails )

  useEffect (() => {
    dispatch(getProductsDetails(id))

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  },[dispatch, alert,error,id])

const addtoCart = () => {
    dispatch(addItemToCart(id,quantity));
    alert.success('Item added to Cart ')
}


const decreaseQty = () => {
const count = document.querySelector('.count');

if(count.valueAsNumber <= 1) return ;
const qty = count.valueAsNumber - 1;

setQuantity(qty)

}

const increaseQty = () => {

  const count = document.querySelector('.count');

if(count.valueAsNumber >= product.stock) return ;
const qty = count.valueAsNumber + 1;

setQuantity(qty)
}

  return (
    <Fragment>
     <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid px-6" id="product_image">
                        <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100 h-80" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 px-8  mt-5">
                            <h3 className="text-2xl font-semibold text-black">{product.name}</h3>
                            <p  id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0}  onClick={addtoCart}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                           <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Submit Your Review
                            </button>
                              
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                          


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value=''
                                                       
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white"  data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                  

    </Fragment>
  );
};

export default ProductDetails