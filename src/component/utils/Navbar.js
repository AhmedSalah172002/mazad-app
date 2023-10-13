import React from 'react'
import logo from "../../images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import logout from "../../images/logout.png"
import bell from "../../images/bell.png"
import UnopDropdown from 'unop-react-dropdown'
import GetLoggedCartHook from '../../hook/cart/GetLoggedCartHook'

const Navbar = () => {

  const [res] =GetLoggedCartHook()

  const navigate = useNavigate();
  let auth
  if(localStorage.getItem("user") !== null){
    auth = JSON.parse(localStorage.getItem("user"))
  }

  const Logout =()=>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login")
  }
const CloseDropDown = () => {
  const dropdownBtn= document.querySelector(".dropdown-btn .bell-btn")
  dropdownBtn.click()
}

  return (
    <>
   <nav dir='rtl' className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src={logo} alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {
          auth ? auth.role ==="Merchant" ? <>
          <li className="nav-item">
          <Link className="nav-link" to='/add-product'>أضف منتج</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/merchant-product">منجاتي</Link>
        </li>
          </>:<li className="nav-item">
          <Link className="nav-link" to={'/my-orders'}>مشترياتي</Link>
        </li> :null 
        }
        
        
      </ul>
      {
        auth && auth.role === "user" ?   <div className='dropdown-btn position-relative'>
        <UnopDropdown
          align="RIGHT"
          trigger={<button className='bell-btn'><img src={bell} alt="bell" style={{width:"28px"}} /></button>}
        >
          <ul className='dropdown-ul'
            style={{
              marginTop:"5px",
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              boxSizing: 'border-box',
              padding: '30px',
              width: '300px'
            }}
          >
            {
              res?.data?._id ?
                <li>
                 <div className='d-flex justify-content-between align-items-center'>
                 <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/product/${res.data.product?._id}`}>
                 <img src={res.data.product?.image} style={{width:"40px"}} alt="image" /></Link>
                  <p>{res.data.product?.name}</p>
                  <p>{res.data.totalPrice}</p>
                 </div>
                 <Link className='order-payment mt-2' onClick={()=> CloseDropDown()} to={"order/payment"}>الشراء</Link>
                </li> : <li>لايوجد منتجات حتي الأن</li>
              
            }
          </ul>
          
        </UnopDropdown>
        {
            res?.data?._id ?<span className='notification'></span> :null
          }
      </div>  :null
      }

      {
        auth ?<button onClick={()=>Logout()} className='nav-btn' style={{backgroundColor:"#242672"}}> <img src={logout} style={{width:"20px",marginLeft:"15px"}}  alt="" /> تسجيل خروج </button> : <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to='/login'><button className='nav-btn'> <FontAwesomeIcon icon={faUser} /> تسجيل الدخول </button></Link>
      }
    </div>
  </div>
</nav> 
    </>
  )
}

export default Navbar
