import React from 'react'
import GetAddressHook from '../../hook/address/GetAddressHook'
import { useState } from 'react'
import notify from '../../hook/useNotifaction'
import { ToastContainer } from 'react-toastify'
import OrderPayCardHook from '../../hook/checkout/OrderPayCardHook'
import AddAddressHook from '../../hook/address/AddAddressHook'

const Payment = () => {
   const [res] =GetAddressHook()
   const [alias, detalis, phone,city, onChangeAlias,onChangeCity, onChangeDetalis, onChangePhone, onSubmit]=AddAddressHook()
   const [handelCreateOrderCARD] = OrderPayCardHook(res.data)
   
    const handelPay = () => {
        handelCreateOrderCARD() 
    }
 return (
    <>
    <div dir='rtl' className="payment mt-5 mb-5">
        <div className="container">
           <div className="payment-cont ">
           <h2 className='mb-5'>إتمام عملية الدفع</h2>
            <h4 className='mb-4 mt-2'>اختر عنوانا من فضلك :</h4>
            <div className='mb-4 d-flex'>
                <select  name="address" id="" >
                <option value="0">اختر عنوان للشحن</option>
                  {
                    res.data ? res.data.map((e,i)=>{
                        return(
                            <option key={i} value={e._id}>{e.alias}</option>
                        )
                    }) : <option disabled key={0} value={0}>من فضلك اضف عنواناً اولاً </option>
                  }
                </select>
                <button className='add-address'  data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample1" aria-controls="offcanvasExample1">
                    إضافة عنوان جديد
            </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title " id="offcanvasExampleLabel">إضافة عنوان جديد</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mt-5">
                   <div className='mb-3 d-flex flex-column'>
                   <label className='mb-2' htmlFor="alias">اسم العنوان</label>
                    <input onChange={(e)=>onChangeAlias(e)} value={alias} style={{backgroundColor:"transparent",padding:"2px 10px",borderColor:"#cbd0dd",outlineColor:"#fd9d3e"}}
                     placeholder='اكتب اسم العنوان' type="text" className='mb-5 ' />
                   </div>

                   <div className='mb-3 d-flex flex-column'>
                   <label className='mb-2' htmlFor="alias">التفاصيل</label>
                    <input onChange={(e)=>onChangeDetalis(e)} value={detalis} style={{backgroundColor:"transparent",padding:"2px 10px",borderColor:"#cbd0dd",outlineColor:"#fd9d3e"}}
                     placeholder='اكتب التفاصيل' type="text" className='mb-5 ' />
                   </div>

                   <div className='mb-3 d-flex flex-column'>
                   <label className='mb-2' htmlFor="alias">رقم الهاتف</label>
                    <input  onChange={(e)=>onChangePhone(e)} value={phone} style={{backgroundColor:"transparent",padding:"2px 10px",borderColor:"#cbd0dd",outlineColor:"#fd9d3e"}}
                     placeholder='اكتب رقم الهاتف' type="text" className='mb-5 ' />
                   </div>

                   <div className='mb-3 d-flex flex-column'>
                   <label className='mb-2' htmlFor="alias">اسم المدينة</label>
                    <input onChange={(e)=>onChangeCity(e)} value={city} style={{backgroundColor:"transparent",padding:"2px 10px",borderColor:"#cbd0dd",outlineColor:"#fd9d3e"}}
                     placeholder='اكتب اسم المدينة' type="text" className='mb-5 ' />
                   </div>
                    
                    <button onClick={()=> onSubmit()}  className='add-address-btn'>إضافة</button>
                </div>
            </div>
            </div>
            <div className='mb-3 d-flex justify-content-end'>
            <button onClick={handelPay} className='pay-btn'>إتمام عملية الدفع</button>
            </div>
           </div>
        </div>
        <ToastContainer/>
    </div>
    </>
 )
}

export default Payment
