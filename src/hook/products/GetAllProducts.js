import React, { useEffect, useState } from 'react'
import {  getAllProducts } from '../../redux/actions/productsAction';
import { useDispatch, useSelector } from 'react-redux';

const GetAllProducts = (limitProducts) => {
    const limit=limitProducts||5
    const [filter , setFilter]=useState("")
    const dispatch = useDispatch();

    const getProductsFunc= async()=>{
        await dispatch(getAllProducts(limit,filter))
        
    }
    useEffect(() => {
        getProductsFunc()
    }, [])
    useEffect(() => {
        getProductsFunc()
    }, [filter])


    const allProducts = useSelector((state) => state.allproducts.allProducts);
    let items = [];let pageCount = []; let results = 0;
    try {
        if (allProducts.data)
            items = allProducts.data;
        else
            items = []
    } catch (e) {
        console.log(e);
     }
     try {
        if (allProducts.paginationResult)
            pageCount= allProducts.paginationResult.numberOfPages;
        else
            pageCount = []
    } catch (e) { 
        console.log(e);
    }
    try {
        if (allProducts.results)
            results = allProducts.results;
        else
            results = 0
    } catch (e) { 
        console.log(e);
    }



    

     const onPress = async (page) => {      
        await dispatch(getAllProducts(limit,filter,page))
    
    }

    return [items,filter , setFilter ,onPress,pageCount,results ]
}

export default GetAllProducts
