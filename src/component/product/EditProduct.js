import React from 'react'
import { useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import EditProductHook from '../../hook/products/EditProductHook'

const EditProduct = ({productId}) => {
    const dateRef=useRef()
    const [img, name,description,InitialPrice,LowestBidValue,BiddingStartTime, loading, isPress, handelSubmit, onImageChange, onChangeName,onChangeDescription,onChangeBiddingStartTime,onChangeLowestBidValue,onChangeInitialPrice]
        =EditProductHook(productId)
  return (
    <div dir='rtl' className="addproduct mt-5 mb-5">
        <div className="container">
            <h2 className=' mb-5'>التعديل علي المنتج</h2>
            <div className="product-image mb-5">
                <label style={{cursor:"pointer"}} htmlFor="product-image"><img src={img} alt="addImage" style={{width:"100px"}} /></label>
                <input onChange={(e)=> onImageChange(e)} type="file" name="product-image" id="product-image" className='productImage' />
            </div>
            <div className="product-input d-flex flex-column mb-3">
                <label htmlFor="name">اسم المنتج</label>
                <input onChange={(e)=> onChangeName(e)} value={name} type="text" placeholder='اسم المنتج' id="name" />
            </div>
            <div className="product-input d-flex flex-column mb-3">
                <label htmlFor="description">وصف المنتج</label>
                <input onChange={(e)=> onChangeDescription(e)} value={description}  type="text" placeholder='وصف المنتج' id="description" />
            </div>
            <div className="product-input d-flex flex-column mb-3">
                <label htmlFor="InitialPrice">السعر المبدأي</label>
                <input onChange={(e)=> onChangeInitialPrice(e)} value={InitialPrice}  type="number"  placeholder='السعر المبدأي' id="InitialPrice" />
            </div>
            <div className="product-input d-flex flex-column mb-3">
                <label htmlFor="LowestBidValue">أقل قيمة للمزايدة</label>
                <input onChange={(e)=> onChangeLowestBidValue(e)} value={LowestBidValue}  type="number"  placeholder='أقل قيمة للمزايدة' id="LowestBidValue" />
            </div>
            <div className="product-input d-flex flex-column mb-3">
                <label htmlFor="BiddingStartTime">تاريخ بدأ المزايدة</label>
                <input onChange={(e)=> onChangeBiddingStartTime(e)} value={BiddingStartTime?.split("T")[0]}  ref={dateRef}  type="text"  placeholder='تاريخ بدأ المزايدة' id="BiddingStartTime"
                onFocus={() => dateRef.current.type = "date"}
                onBlur={() => dateRef.current.type = "text"}
                />
            </div>
            <button onClick={()=> handelSubmit()} className='login-btn mb-3'>تعديل</button>

        </div>
        <ToastContainer/>
    </div>
  )
}

export default EditProduct
