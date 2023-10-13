import React from 'react'
import { Link } from 'react-router-dom'
import GetAllOrders from '../../hook/orders/GetAllOrders'

const UserOrder = () => {
  const [ orderData] =GetAllOrders()
  return (
    <div dir='rtl' className="user-orders my-5">
    <div className="container">
    <h2 className='mb-4'>الطلبات</h2>
   {
    orderData ?  <table class="table table-dark mb-5">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">رقم الطلب</th>
        <th scope="col">ايميل العميل</th>
        <th scope="col">اسم العميل</th>
        <th scope="col">قيمة الطلب</th>
      </tr>
    </thead>
    <tbody>
    {
      orderData ?orderData.map((e,i)=>{
        return(
          <tr key={i}>
          <th scope="row">{i+1}</th>
          <td><Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} style={{color:"#07c0de",textDecoration:"none"}} to={`/order/${e._id}`}>{e._id}</Link> </td>
          <td>{e.user.email}</td>
          <td>{e.user.name}</td>
          <td>{e.totalOrderPrice}</td>
        </tr>
        )
      }) :null
     }
     
    </tbody>
  </table> : <h3 className='text-center my-5'>لايوجد طلبات تم شرائها حتي الأن</h3>
   }
    </div>
   </div>
  )
}

export default UserOrder
