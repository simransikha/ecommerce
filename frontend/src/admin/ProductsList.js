import React, { Fragment, useEffect } from 'react';


import {MDBDataTable} from 'mdbreact'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors,deleteProducts} from '../actions/productActions';
import {DELETE_PRODUCTS_RESET } from '../constants/productConstants'
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';

const ProductsList = () => {

    const alert = useAlert();
    const Navigation = useNavigate();
    const dispatch = useDispatch();

    const { error, products, loading } = useSelector(state => state.products);
    const { error : deleteError, isDeleted} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Product is Deleted Successfully');
            Navigation('/admin/products')
            dispatch({type : DELETE_PRODUCTS_RESET})
        }

    }, [dispatch, alert, error,deleteError,isDeleted,Navigation]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProducts(id))
        
        }

    const setProducts = () => {
        const data = {
            columns: [
                
                    {
                        label: 'ID',
                        field: 'id',
                        sort: 'asc'
                    },
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc'
                    },
                    {
                        label: 'Price',
                        field: 'price',
                        sort: 'asc'
                    },
                    {
                        label: 'Stock',
                        field: 'stock',
                        sort: 'asc'
                    },
                    {
                        label: 'Actions',
                        field: 'actions',
                    },
                
            ],
            rows: []
        };

        if (loading) {
            // Handle loading state
            return data;
        }

        if (!products || products.length === 0) {
            console.error("No orders available."); // Add proper error handling or logging here
            return data;
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock, 
                actions:<Fragment>
                 <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                 <i class="fa-solid fa-pencil"></i>
                </Link>
                <button className="btn btn-danger ml-2 py-2 px-2" onClick={ () => deleteProductHandler(product._id)}>
                <i class="fa-solid fa-trash"></i>
                </button>
                </Fragment>
            });
        });

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
                        <h1 className="my-5">All Products</h1>

                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default ProductsList
