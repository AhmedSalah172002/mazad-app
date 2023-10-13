import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneProduct } from '../../redux/actions/productsAction'

const GetProductDetails = (id) => {
  

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneProduct(id))
    },[id])

    const Product = useSelector((state) => state.allproducts.oneProduct);
    let item = [];
    try {
        if (Product.data)
            item = Product.data
        else
            item = []
    } catch (e) {
        console.log(e);
     }

    return [item]
}

export default GetProductDetails
