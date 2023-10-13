import React from 'react'
import { useParams } from 'react-router-dom'
import GetOrderDetailsHook from '../../hook/orders/GetOrderDetailsHook'

const OrderDetails = () => {
    let auth
    if(localStorage.getItem("user") !== null){
      auth = JSON.parse(localStorage.getItem("user"))
    }
    const {orderId}=useParams()
    const [orderData] =GetOrderDetailsHook(orderId)
    console.log(orderData);
  return (
   <div dir='rtl' className="order-details mt-5 mb-5">
    <div className="container">
        <h3 className='mb-5 mt-4'>رقم الطلب : {orderId}</h3>
        <div className="order-details-cont mb-5 d-flex justify-content-between align-items-center">
          <img src={orderData?.product?.image} alt="img" style={{width:"100px"}} />
          <p>{orderData?.product?.name}</p>
          <p>{orderData?.totalOrderPrice}</p>
        </div>
      <div className="order-details-date">
        <p>تاريخ الاصدار : {orderData?.createdAt?.split("T")[0]}</p>
        <p>وقت الاصدار : {orderData?.createdAt?.split("T")[1].split(":")[0]}:{orderData?.createdAt?.split("T")[1].split(":")[1]}</p>
      </div>
      <div className="order-details-merchant">
        <p>اسم التاجر: {orderData?.product?.Merchant?.name}</p>
        <p>رقم الهاتف الخاص به : {orderData?.product?.Merchant?.phone}</p>
      </div>
    </div>
   </div>
  )
}

export default OrderDetails
