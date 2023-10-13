import React from 'react'
import logo from "../../images/logo.svg"
import login from "../../images/Mobile-login-icon.svg"
const Register = () => {
  return (
    <div dir='rtl' className="login-page py-5  " style={{backgroundColor:"#f9fbfc" ,minHeight:"110vh"}}>
    <div className="container">
        <div className="logo-image mb-3">
            <img style={{width:"150px"}} src={logo} alt="logo" />
        </div>
        <h2>انشاء حساب جديد</h2>
        <p>فضلا قم باختيار نوع الحساب وقم بتعبئة البيانات التالية لإنشاء حساب جديد لتستطيع المشاركة في المزادات المتاحة .</p>
        <img src={login} className='img-fluid' alt="" />
    </div>
   </div>
  )
}

export default Register
