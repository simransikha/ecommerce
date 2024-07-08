import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getorderDetails, clearErrors } from '../../actions/orderActions';
import { useAlert } from 'react-alert';

const OrderDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { order, loading, error } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getorderDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    if (loading) {
        return <Fragment>Loading...</Fragment>;
    }

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order || {};

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid = paymentInfo?.status === 'succeeded';

    return (
        <Fragment>
            <div className=" text-center items-center row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">
                    <h1 className="my-5 lg:text-5xl text-3xl text-black">Order . {order?._id}</h1>

                    <h4 className="mb-4lg:text-3xl text-xl ">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                    <p><b>Amount:</b> ${totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                    <h4 className="my-4">Order Status:</h4>
                    <p className={orderStatus && orderStatus.includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                    <h4 className="my-4">Order Items:</h4>
                    <hr />

                    <div className="cart-item my-1">
                        {orderItems && orderItems.map(item => (
                            <div key={item.product} className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
            </div>
        </Fragment>
    );
}

export default OrderDetails;
