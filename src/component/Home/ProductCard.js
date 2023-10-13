import React, { useEffect, useState } from 'react'
import location from "../../images/location.png"
import deleteBtn from "../../images/delete.png"
import editBtn from "../../images/edit.png"
import search from "../../images/arrow-left.png"
import { Link } from 'react-router-dom'
import { deleteProducts } from '../../redux/actions/productsAction'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'


const ProductCard = ({name , productId , status , image , BiddingEndTime ,BiddingStartTime ,Merchant  }) => {
  const dispatch=useDispatch()
  let auth , checker=false
  if(localStorage.getItem("user") !== null){
    auth = JSON.parse(localStorage.getItem("user"))
  }

 if(Merchant){
  if(Merchant.toString() === auth._id.toString()){
    checker = true
  }
 }
    const calculateTimeDifference = () => {
        const difference = new Date(BiddingStartTime) - new Date();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      };
    
      const [timeDifference, setTimeDifference] = useState(calculateTimeDifference);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeDifference(calculateTimeDifference());
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, [BiddingStartTime]); 




      //Delete Product
  const deleteProductById=(productId,name)=>{
    Swal.fire({
      title: 'هل أنت متأكد ؟',
      text: `أنت علي وشك أن تقوم بحذف ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم قم بالحذف',
      cancelButtonText: "الغاء",
    }).then(async(result) => {
      if (result.isConfirmed) {
       await dispatch(deleteProducts(productId))
        Swal.fire(
          'تمت!',
          'لقد قمت بحذف المنتج',
          'success'
        ).then((result)=>{
          if (result.isConfirmed !==false){
            window.location.reload()
          }
        })
        
      }
    })
  }
    
        
  return (
    <>
    <div  className="product-card mb-5 p-3">
      {
        checker ?<div className="settings d-flex justify-content-between">
        <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/edit-product/${productId}`}><span><img src={editBtn} style={{width:"20px",marginRight:"15px",cursor:"pointer"}}  alt="" /></span></Link>
        <span onClick={()=>deleteProductById(productId , name)}><img src={deleteBtn} style={{width:"20px",cursor:"pointer"}}  alt="" /></span>
        </div> :null
      }
        <span className='product-sub-head' style={status==="not-started" ?{backgroundColor:"#259673"}:status === "finished"?{backgroundColor:"#869da5"}:{backgroundColor:"#C70039"}}>{ status === "not-started" ? "مزاد قادم" : status === "finished" ? "مزاد منتهي": "مزاد جارى..."}</span>
        <div className="product-image">
            <img src={image} style={{width:"150px" ,display:"block",margin:"auto"}} alt="image"  />
        </div>
        <h5 className='mb-5 mt-4'>{name || ""}</h5>
        <span><img src={location} style={{width:"20px"}} alt="location" /></span>
        <p style={{fontSize:"8px",color:"#259673",fontWeight:"bold"}}>{status === "not-started" ? "متبقي على بدء المزاد" : null}</p>
        <div className="date d-flex">
            <div className="day d-flex align-items-center flex-column">
               <p>{timeDifference.days>=0 ? timeDifference.days : 0}</p>
               <span>يوم</span>
            </div>
            <div className="hours d-flex align-items-center flex-column">
                <p>{timeDifference.hours >=0 ? timeDifference.hours : 0}</p>
                <span>ساعه</span>
            </div>
            <div className="minutes d-flex align-items-center flex-column">
                <p>{timeDifference.minutes >=0 ? timeDifference.minutes : 0}</p>
                <span>دقيقة</span>
            </div>
            <div className="seconds d-flex align-items-center flex-column">
                <p>{timeDifference.seconds >=0 ? timeDifference.seconds : 0}</p>
                <span>ثانية</span>
            </div>
        </div>
        {
          status === "start-now" &&  auth && auth.role === "user" ?<Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/mazad/${productId}`}> <button className='mazad'>مشاركة في المزاد</button> </Link>
          :null
        }
        <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/product/${productId}`}><button className='details'> التفاصيل<img src={search} className='me-2' style={{width:"20px"}} alt="" /></button></Link>
    </div>
    </>
  )
}

export default ProductCard
