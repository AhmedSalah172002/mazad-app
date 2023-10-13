import { DELETE_PRODUCTS,  UPDATE_PRODUCTS, CREATE_PRODUCTS,  GET_PRODUCT_DETALIS, GET_ALL_PRODUCTS,ADD_TO_MAZAD, GET_ERROR } from '../type'

const inital = {
    products: [],
    allProducts: [],
    oneProduct: [],
    deleteProducts: [],
    updateProducts: [],
    addMazad: [],
    loading: true,
}
const productsReducer = (state = inital, action) => {
    switch (action.type) {
        case CREATE_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                loading: false,
            }
        case GET_PRODUCT_DETALIS:
            return {
                oneProduct: action.payload,
                loading: false,
            }
        
        case DELETE_PRODUCTS:
            return {
                ...state,
                deleteProducts: action.payload,
                loading: false,
            }
        case UPDATE_PRODUCTS:
            return {
                ...state,
                updateProducts: action.payload,
                loading: false,
            }
            case ADD_TO_MAZAD:
                return {
                    ...state,
                    addMazad: action.payload,
                    loading: false,
                }
        case GET_ERROR:
            return {
                loading: true,
                products: action.payload,
            }
        default:
            return state;
    }
}
export default productsReducer