
import { LOGIN_USER, REGISTER } from '../type'

import { useInsertData } from '../../hooks/useInsertData';

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

