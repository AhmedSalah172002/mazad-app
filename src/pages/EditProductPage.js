import React from 'react'
import EditProduct from '../component/product/EditProduct'
import { useParams } from 'react-router-dom'

const EditProductPage = () => {
  const {productId}=useParams()
  console.log(productId);
  return (
   <>
   <EditProduct productId={productId}/>
   </>
  )
}

export default EditProductPage
