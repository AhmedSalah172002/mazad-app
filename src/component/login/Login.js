import React from 'react'
import logo from "../../images/logo.svg"
import login from "../../images/Mobile-login-icon.svg"
const Login = () => {
  return (
   <>
   <div dir='rtl' className="login-page py-5  " style={{backgroundColor:"#f9fbfc"}}>
    <div className="container">
        <div className="logo-image mb-3">
            <img style={{width:"150px"}} src={logo} alt="logo" />
        </div>
        <h2>تسجيل الدخول</h2>
        <p>فضلا قم بتسجيل الدخول بحسابك لتستطيع المشاركه في المزادات المتاحه .</p>
        <img src={login} className='img-fluid' alt="" />
    </div>
   </div>
   </>
  )
}

export default Login
