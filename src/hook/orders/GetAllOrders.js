import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllOrdersToUSer } from '../../redux/actions/orderAction';
import { useEffect } from 'react';

const GetAllOrders = () => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user'))
    let userName = ''
    if (user != null)
        userName = user.name

    const get = async () => {
        setLoading(true)
        await dispatch(getAllOrdersToUSer())
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    
    const resAllOrder = useSelector(state => state.orderReducer.AllOrders)
    console.log(resAllOrder);
    useEffect(() => {
        if (loading === false) {
            if (resAllOrder.data)
                setOrderData(resAllOrder.data)

        }
    }, [loading])


    return [orderData]
}

export default GetAllOrders
