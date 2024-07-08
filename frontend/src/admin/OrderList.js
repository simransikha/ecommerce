import React, { Fragment, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors,deleteOrder } from '../actions/orderActions';
import { DELETE_ORDER_RESET } from '../constants/orderConstants';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';

const OrderList = () => {
    const alert = useAlert();
    const Navigation = useNavigate();
    const dispatch = useDispatch();

    const { error, orders } = useSelector(state => state.allOrders);
    const {isDeleted} = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isDeleted){
          alert.success('Deleted Successfully');
          Navigation('/admin/orders')
          dispatch({type: DELETE_ORDER_RESET})
        }

    }, [dispatch, alert, error,isDeleted,Navigation]);

    const deleteHandler = (id) => {
        // Handle delete logic here
        dispatch(deleteOrder(id))
    };

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of items',
                    field: 'numofItems',
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
                },
            ],
            rows: []
        };
    
        if (orders) {
            orders.forEach(order => {
                data.rows.push({
                    id: order._id,
                    numofItems: order.orderItems.length,
                    amount: `$${order.totalPrice}`,
                    status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                        ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                    actions: (
                        <Fragment>
                            <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa-solid fa-eye"></i>
                            </Link>
                            <button  className="btn btn-danger ml-2 py-2 px-2" onClick={() => deleteHandler(order._id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </Fragment>
                    )
                });
            });
        }
    
        return data;
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>
                        <MDBDataTable
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
}

export default OrderList;
