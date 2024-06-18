import { CHECK_INSURANCE_PAYMENT, CREATE_ORDER_CARD } from '../type'
import {  useGetDataToken } from '../../hooks/useGetData'




//create order by card for user
export const createOrderCARD = (id, body) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/checkout-session/${id}`, body);
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: e.response,
        })
    }
}


//create order by card for user
export const checkInsurancePayment = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/insurance-payment/${id}`);
        dispatch({
            type: CHECK_INSURANCE_PAYMENT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CHECK_INSURANCE_PAYMENT,
            payload: e.response,
        })
    }
}
