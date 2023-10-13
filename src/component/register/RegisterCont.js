import React from 'react'
import { Link } from 'react-router-dom'
import SignupHook from '../../hook/auth/SignupHook'
import { ToastContainer } from 'react-toastify'

const RegisterCont = () => {
    const [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword,onChangeRole, OnSubmit]=
    SignupHook()

  return (
    <div className='py-5' style={{backgroundColor:"white"}}>
    <div className="name d-flex flex-column mb-3" >
      <label className='mb-3'  htmlFor="name">الاسم :</label>
      <input type="text" onChange={(e)=>onChangeName(e)} value={name} name="name" placeholder='اكتب الاسم ...' id="name" />
    </div>
    <div className="email d-flex flex-column mb-3" >
      <label className='mb-3' htmlFor="email">البريد الالكتروني :</label>
      <input type="email" onChange={(e)=>onChangeEmail(e)}  value={email} name="email" placeholder='example@gmail.com' id="email" />
    </div>
    <div className="password d-flex flex-column  mb-3">
      <label  className='mb-3' htmlFor="password"> كلمة المرور :</label>
      <input type="password" onChange={(e)=>onChangePassword(e)} value={password} name="password" placeholder='************' id="password" />
    </div>
    <div className="passwordConfirm d-flex flex-column  mb-3">
      <label  className='mb-3' htmlFor="passwordConfirm ">  تأكيد كلمة المرور :</label>
      <input type="password" onChange={(e)=>onChangeConfirmPassword(e)} value={confirmPassword} name="passwordConfirm " placeholder='************' id="passwordConfirm " />
    </div>
    <div className="role">
        <div className="user mb-2">
        <input type="radio" onClick={(e)=>onChangeRole(e)} checked name="role" value='user' id="user" />
        <label htmlFor='user' className='d-inline-block me-2'>مستخدم</label>
        </div>
        <div className="merch mb-3">
        <input type="radio" onClick={(e)=>onChangeRole(e)} name="role" value='Merchant' id="merchant" />
        <label htmlFor='merchant' className='d-inline-block me-2'>تاجر</label>
        </div>
    </div>
    <div className="phone d-flex flex-column mb-3" >
      <label className='mb-3' htmlFor="phone ">رقم الهاتف :</label>
      <input type="text" onChange={(e)=>onChangePhone(e)} value={phone} name="phone " placeholder='01095572350' id="phone " />
    </div>
    <button onClick={()=> OnSubmit()} className='login-btn mb-3'>إنشاء الحساب </button>
    <ToastContainer />
  </div>
  )
}

export default RegisterCont
