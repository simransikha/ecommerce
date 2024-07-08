import React, { Fragment, useEffect } from 'react';


import {MDBDataTable} from 'mdbreact'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors} from '../../actions/orderActions';
import { useAlert } from 'react-alert';

const ListItem = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, orders, loading } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        };

        if (loading) {
            // Handle loading state
            return data;
        }

        if (!orders || orders.length === 0) {
            console.error("No orders available."); // Add proper error handling or logging here
            return data;
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Link to={`/order/${order._id}`} className="btn btn-primary">
                    <i className="fa fa-eye"></i>
                </Link>
            });
        });

        return data;
    };

    return (
        <Fragment>
            <h1 className="my-5 text-center text-2xl font-bold">My Orders</h1>
            <div className="lg:px-6 px-2">
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </Fragment>
  )
}

export default ListItem
