
import { useInsertData, useInsertDataWithImage } from '../../hooks/useInsertData';
import { DELETE_PRODUCTS,  UPDATE_PRODUCTS, CREATE_PRODUCTS, GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS,ADD_TO_MAZAD,TERMINATE_PRODUCT_STATUS } from '../type'
import {useGetData, useGetDataToken} from '../../hooks/useGetData';
import useDeleteData from '../../hooks/useDeleteData';

import { useInUpdateDataWithImage } from '../../hooks/useUpdateData';


//create products with pagination
export const createProduct = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/v1/products", formatData);
        
        dispatch({
            type: CREATE_PRODUCTS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CREATE_PRODUCTS,
            payload: e.response,
        })
    }
}

//get all products with pagination
export const getAllProducts = (limit,status,category,search,priceFilter,page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products?page=${page}&keyword=${search}&limit=${limit}&sort=-createdAt&${status}${category}&${priceFilter}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: e.response,
        })
    }
}

//get all products with pagination
export const getAllMerchantProducts = (limit,status,page) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/products/special?page=${page}&limit=${limit}&status=${status}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: e.response,
        })
    }
}



//get one product with id
export const getOneProduct = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products/${id}`);
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: e.response,
        })
    }
}



//delete prooduct with id
export const deleteProducts = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/products/${id}`);

        dispatch({
            type: DELETE_PRODUCTS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: DELETE_PRODUCTS,
            payload: e.response,
        })
    }
}

//update prooduct with id
export const updateProducts = (id, data) => async (dispatch) => {
    try {
        const response = await useInUpdateDataWithImage(`/api/v1/products/${id}`, data);
        dispatch({
            type: UPDATE_PRODUCTS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: UPDATE_PRODUCTS,
            payload: e.response,
        })
    }
}



//add to mazad
export const addToMazad = (id, data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/mazad/${id}`, data);
        dispatch({
            type: ADD_TO_MAZAD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: ADD_TO_MAZAD,
            payload: e.response,
        })
    }
}





//get one product with id
export const terminateProductStatus = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/products/terminate/${id}`);
        dispatch({
            type: TERMINATE_PRODUCT_STATUS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: TERMINATE_PRODUCT_STATUS,
            payload: e.response,
        })
    }
}