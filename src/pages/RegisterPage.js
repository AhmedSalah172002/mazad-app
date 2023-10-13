import React from 'react'
import Register from '../component/register/Register'
import RegisterCont from '../component/register/RegisterCont'

const RegisterPage = () => {
  return (
   <>
   <div dir='rtl' className="row">
    <div className="col-lg-6 col-md-12">
        <Register />
    </div>
    <div className="col-lg-6 col-md-12">
        <RegisterCont />
    </div>
   </div>
   
   
   </>
  )
}

export default RegisterPage
