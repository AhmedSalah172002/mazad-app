import { ADD_TO_CART, GET_ALL_USER_CART } from '../type'
import { useGetData, useGetDataToken } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData';
import useDeleteData from './../../hooks/useDeleteData';
import { useInsUpdateData } from './../../hooks/useUpdateData'
//add to cart
export const addProductToCart = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/cart`, body);
        dispatch({
            type: ADD_TO_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ADD_TO_CART,
            payload: e.response,
        })
    }
}


//get all cart items
export const getAllUserCartItems = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/cart`);
        dispatch({
            type: GET_ALL_USER_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_USER_CART,
            payload: e.response,
        })
    }
}

