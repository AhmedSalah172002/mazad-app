import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneOrders } from '../../redux/actions/orderAction';
import { useEffect } from 'react';

const GetOrderDetailsHook = (id) => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const dispatch = useDispatch()


    const get = async () => {
        setLoading(true)
        await dispatch(getOneOrders(id))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const resOneOrder = useSelector(state => state.orderReducer.getOneOrder)
    useEffect(() => {
        if (loading === false) {
            if (resOneOrder.data)
                setOrderData(resOneOrder.data)
            console.log(resOneOrder)
        }
    }, [loading])


    return [orderData]
}

export default GetOrderDetailsHook
