import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import authReducer from './authReducer'
import userAddressesReducer from './addressReducer'
import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'
import orderReducer from './orderReducer'
import categoryReducer from './categoryReducer'



export default combineReducers({
    allproducts: productsReducer,
    authReducer: authReducer,
    userAddressesReducer: userAddressesReducer,
    cartReducer: cartReducer,
    checkoutReducer: checkoutReducer,
    orderReducer: orderReducer,
    categoryReducer: categoryReducer,
    
})