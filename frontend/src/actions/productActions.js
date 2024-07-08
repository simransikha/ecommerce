import axios from "axios";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCTS_REQUEST,
    NEW_PRODUCTS_SUCCESS,
    NEW_PRODUCTS_FAIL,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,
    UPDATE_PRODUCTS_REQUEST,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, minPrice = 0, maxPrice = 10000, category='', rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`

        if (category) {
            link += `&category=${category}`;
        }

        
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch ({ type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch ({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch ({ type: NEW_PRODUCTS_REQUEST})

     const config = {
           headers: {
            'Content-Type' : 'application/json'
           }
     }


        const { data } = await axios.post(`/api/v1/admin/product/new`,productData,config)

        dispatch ({
            type: NEW_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: NEW_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}


export const updatedProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch ({ type: UPDATE_PRODUCTS_REQUEST})

     const config = {
           headers: {
            'Content-Type' : 'application/json'
           }
     }


        const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData,config)

        dispatch ({
            type: UPDATE_PRODUCTS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        
        dispatch({
            type: UPDATE_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}






export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch ({ type: ADMIN_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/v1/admin/products`)

        dispatch ({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}


//deleteAdmin Product
export const deleteProducts = (id) => async (dispatch) => {
    try {
        dispatch ({ type: DELETE_PRODUCTS_REQUEST})

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        

        dispatch ({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}

//clear Errors

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}