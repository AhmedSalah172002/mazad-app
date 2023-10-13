import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../../redux/actions/cartAction'
import notify from '../useNotifaction'

const AddCartHook = (productId) => {
 const dispatch = useDispatch()
 const [loading, setLoading] = useState(true)

 const addToCartHandel = async (userId) => {
    
    setLoading(true)
    await dispatch(addProductToCart({
        productId,
        userId
    }))
    setLoading(false)
}


return [ addToCartHandel]

}

export default AddCartHook
