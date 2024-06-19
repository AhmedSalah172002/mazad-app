import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import authReducer from './authReducer'
import userAddressesReducer from './addressReducer'
import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'
import orderReducer from './orderReducer'
import loggedUserReducer from './loggedUserReducer'



export default combineReducers({
    allproducts: productsReducer,
    authReducer: authReducer,
    userAddressesReducer: userAddressesReducer,
    cartReducer,
    checkoutReducer,
    orderReducer,
    loggedUserReducer,


})