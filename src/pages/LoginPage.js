import React from 'react'
import Login from '../component/login/Login'
import LoginCont from '../component/login/LoginCont'

const LoginPage = () => {
  return (
   <>
  <div dir='rtl' className="row">
    <div className="col-lg-6 col-md-12">
    <Login />
    </div>
    <div className="col-lg-6 col-md-12">
   <LoginCont />
    </div>
  </div>
   </>
  )
}

export default LoginPage
