
import { FORGET_PASSWORD, LOGIN_USER, NEW_PASSWORD, REGISTER, SEND_CODE } from '../type'

import { useInsertData } from '../../hooks/useInsertData';
import { useInsUpdateData } from '../../hooks/useUpdateData';

//create new user 
export const register = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/signup`, data);
        dispatch({
            type: REGISTER,
            payload: response,
        })

    } catch (e) {
        dispatch({ 
            type: REGISTER,
            payload: e.response,
        })
    }
}

//login  user 
export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/login`, data);
        dispatch({
            type: LOGIN_USER,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: LOGIN_USER,
            payload: e.response,
        })
    }
}


//forget password 
export const forgetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
        dispatch({
            type: FORGET_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: FORGET_PASSWORD,
            payload: e.response,
        })
    }
}

//send code 
export const sendCode = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
        dispatch({
            type: SEND_CODE,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: SEND_CODE,
            payload: e.response,
        })
    }
}

//new password 
export const updatenewPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/auth/resetPassword`, data);
        dispatch({
            type: NEW_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: NEW_PASSWORD,
            payload: e.response,
        })
    }
}

