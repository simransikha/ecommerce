import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,
    DELETE_PRODUCTS_RESET,
    NEW_PRODUCTS_REQUEST,
    NEW_PRODUCTS_SUCCESS,
    NEW_PRODUCTS_FAIL,
    NEW_PRODUCTS_RESET,
    UPDATE_PRODUCTS_REQUEST,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,
    UPDATE_PRODUCTS_RESET,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const  ProductsReducer = (state = { products: [] } , action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
                case ADMIN_PRODUCTS_SUCCESS:
                    return {
                        loading:false,
                        products:action.payload
                    }

                case ALL_PRODUCTS_FAIL:
                case ADMIN_PRODUCTS_FAIL:
                    return{
                        loading : false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null
                        }
            
    
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} } , action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
    
            }
            case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload
    
            }
            case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error:action.payload
    
            }
            case CLEAR_ERRORS:
                            return{
                                ...state,
                                error:null
                            }
            
    
        default:
          return  state;
    }
    
    }

    export const newProductReducer = (state = { product: {} } , action) => {

        switch (action.type) {
            case NEW_PRODUCTS_REQUEST:
                return {
                    ...state,
                    loading:true
        
                }
                case NEW_PRODUCTS_SUCCESS:
                return {
                    loading:false,
                    success:action.payload.success,
                    product:action.payload.product
        
                }
                case NEW_PRODUCTS_FAIL:
                return {
                    ...state,
                    error:action.payload
        
                }
                case NEW_PRODUCTS_RESET:
                return {
                    ...state,
                    success:false
        
                }
                case CLEAR_ERRORS:
                                return{
                                    ...state,
                                    error:null
                                }
                
        
            default:
              return  state;
        }
        
        }

        export const productReducer = (state = {}  , action) => {

            switch (action.type) {
                case DELETE_PRODUCTS_REQUEST:
                case UPDATE_PRODUCTS_REQUEST:
                    return {
                        ...state,
                        loading:true
            
                    }
                    case DELETE_PRODUCTS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isDeleted:action.payload
            
                    }

                    case UPDATE_PRODUCTS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isUpdated:action.payload
            
                    }
                    case DELETE_PRODUCTS_FAIL:
                    case UPDATE_PRODUCTS_FAIL:
                    return {
                        ...state,
                        error:action.payload
            
                    }
                    case DELETE_PRODUCTS_RESET:
                    return {
                        ...state,
                        isDeleted:false
            
                    }
                    case  UPDATE_PRODUCTS_RESET:
                        return {
                            ...state,
                            isUpdated:false
                
                        }
                    case CLEAR_ERRORS:
                                    return{
                                        ...state,
                                        error:null
                                    }
                    
            
                default:
                  return  state;
            }
            
            }