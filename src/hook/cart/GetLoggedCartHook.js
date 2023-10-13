import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCartItems } from '../../redux/actions/cartAction';

const GetLoggedCartHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
   

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getAllUserCartItems())
            setLoading(false)
        }
        get()
    }, [])
    const res = useSelector(state => state.cartReducer.getAllUserCart)
   

    return [res]
}

export default GetLoggedCartHook
