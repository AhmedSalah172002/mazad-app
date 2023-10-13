import { GET_ALL_ORDER, GET_ONE_ORDER ,GET_ALL_ORDER_TO_USER } from '../type'

import { useGetDataToken } from '../../hooks/useGetData'

export const getAllOrders = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders?limit=${limit}&page=${page}`);
        dispatch({
            type: GET_ALL_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_ORDER,
            payload: e.response,
        })
    }
}


export const getAllOrdersToUSer = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders`);
        dispatch({
            type: GET_ALL_ORDER_TO_USER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_ORDER_TO_USER,
            payload: e.response,
        })
    }
}

export const getOneOrders = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/${id}`);

        dispatch({
            type: GET_ONE_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_ORDER,
            payload: e.response,
        })
    }
}

