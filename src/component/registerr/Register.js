import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import vec5 from '../../images/Vector 5.png';
import vec6 from '../../images/Vector 6.svg';
import logo from '../../images/logo (1).svg';
import group from '../../images/Group 1.svg';
import com from '../../images/Component 1.svg';
import rect from '../../images/Rectangle 43 (1).png';
import { Button, Typography } from '@mui/material';

const Register = () => {
  const[val , setVal]= useState({
    gmail:"",
    user:"",
    pass:"",
    confirmPass:""
  });
 
  return (
    <div  style={{background: "#21204C", width:"100%" , height:"650px",display:"flex",
    justifyContent:"center", alignItems:"center"}}>
    <div className='container'>
   <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  w-[100%] sm:w-[100%] md:w-[70%] lg:w-[70%] xl:w-[70%] 2xl:w-[60%] bg-slate-500 md:bg-slate-600'  style={{background: "#D9D9D9", height:"560px", borderRadius:10 ,  position:"relative"
    , margin:"0 auto"}}>
   
  


   <div className=' mt-[15px] flex flex-col items-center sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto' >
   <img className='' src={logo} style={{width:"120px"}}></img>
   <Typography variant='h5' sx={{color:" #403DA8", marginTop:"10px"}}>إنشاء حساب جديد</Typography>
   <form className='mt-[20px] text-center  sm:items-center md:items-center' >
   <input className='w-[80%] p-2 m-2 bg-transparent  border-solid border-2
    border-black rounded-[5px] focus:outline-violet-700
    ' placeholder='البريد الإلكتروني' value={val.gmail} onChange={(e) =>setVal({...val,gmail:e.target.value})}></input>
   <input className='m-2 p-2 w-[80%] border-spacing-4 border-solid border-2
    border-black bg-transparent rounded-[5px] focus:outline-violet-700' placeholder='إسم المستخدم' value={val.user} onChange={(e) =>setVal({...val,user:e.target.value})}></input>
   <input className='m-2 p-2 w-[80%] border-solid border-2 border-black bg-transparent
    rounded-[5px] focus:outline-violet-700 placeholder:right-1' placeholder='كلمة المرور' value={val.pass} onChange={(e) =>setVal({...val,pass:e.target.value})}></input>
   <input className='w-[80%] p-2 m-2 border-solid border-2 border-black bg-transparent
    rounded-[5px] focus:outline-violet-700' placeholder='إعادة كتابة كلمة المرور' value={val.confirmPass} onChange={(e) =>setVal({...val,confirmPass:e.target.value})}></input>
   </form>
   <div className='flex mt-[20px] gap-5'>
   <img className='w-[50px] cursor-pointer' src={group} alt=''></img>
   <img className='w-[50px] cursor-pointer' src={com} alt=''></img>
   </div>
   <div>
   <Button className='shadow-[#50d71e] bg-gradient-to-r from-blue-950 to-blue-950 w-[180px] xs:w-[320px] sm:w-[400px] md:w-[200px] lg:w-[300px]' variant="contained" sx={{marginTop:"15px" , padding:"13px",fontSize:"1.2em"  
}}>إنشاء حساب</Button>
   </div>
   </div>
   



   <div  className='hidden sm:hidden md:block' style={{position:"relative"}}>
   <Typography className='text-center  right-[30%] lg:right-[46%] xl:right-[38%]' variant='h4' sx={{position:"absolute", top:"42%", zIndex:2, color:"white" , fontSize:"2.2em", width:"50%"}}>أهلا بكم في موقع مزادي</Typography>
   <img className='w-[140px] sm-w[150px] md:w-[220px] xl:w-[300px]'  src={rect} style={{position:"absolute" , left:0,  height:" 560px" }}></img>
   <img  className='w-[100px] md:w-[194px] xl:w-[274px]'  src={vec5} style={{position:"absolute" , left:26,top:0 }}></img>
   <img className='w-[200px] xl:w-[280px]'   src={vec6} style={{position:"absolute" , left:0,bottom:0 }}></img>
    </div>
   </div>
   </div>
    </div>
   
  )
}

export default Register