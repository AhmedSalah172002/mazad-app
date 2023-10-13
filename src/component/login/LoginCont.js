import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LoginHook from '../../hook/auth/LoginHook'

const LoginCont = () => {
  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit] =LoginHook()
  return (
    <div className='py-5' style={{backgroundColor:"white"}}>
      <div className="email d-flex flex-column mb-5" >
        <label className='mb-3' htmlFor="email">البريد الالكتروني :</label>
        <input type="email" onChange={(e)=>onChangeEmail(e)}  value={email} name="email" placeholder='example@gmail.com' id="email" />
      </div>
      <div className="password d-flex flex-column  mb-5">
        <label  className='mb-3' htmlFor="password"> كلمة المرور :</label>
        <input type="password" onChange={(e)=>onChangePassword(e)} value={password} name="password" placeholder='************' id="password" />
      </div>
      <button onClick={()=>onSubmit()} className='login-btn mb-3'>تسجيل الدخول</button>
      <Link style={{textDecoration:"none"}} onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to='/register'><button className='register-btn'>إنشاء حساب</button></Link>
      <ToastContainer/>
    </div>
  )
}

export default LoginCont
