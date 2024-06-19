// import React from 'react'
// import logo from "../../images/mazady-logo-white.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { Link, useNavigate } from 'react-router-dom'
// import logout from "../../images/logout.png"
// import bell from "../../images/bell.png"
// import UnopDropdown from 'unop-react-dropdown'
// import GetLoggedCartHook from '../../hook/cart/GetLoggedCartHook'

// const Navbar = () => {

//   const [res] =GetLoggedCartHook()

//   const navigate = useNavigate();
//   let auth
//   if(localStorage.getItem("user") !== null){
//     auth = JSON.parse(localStorage.getItem("user"))
//   }

//   const Logout =()=>{
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     navigate("/login")
//   }
// const CloseDropDown = () => {
//   const dropdownBtn= document.querySelector(".dropdown-btn .bell-btn")
//   dropdownBtn.click()
// }

//   return (
//     <>
//    <nav dir='rtl' className="navbar navbar-expand-lg ">
//   <div className="container">
//     <Link className="navbar-brand" to="/"><img src={logo} style={{width:'60px'}} alt="logo" /></Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         {
//           auth ? auth.role ==="Merchant" ? <>
//           <li className="nav-item">
//           <Link className="nav-link" to='/add-product'>أضف منتج</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/merchant-product">منجاتي</Link>
//         </li>
//           </>:<li className="nav-item">
//           <Link className="nav-link" to={'/my-orders'}>مشترياتي</Link>
//         </li> :null
//         }

//       </ul>
//       {
//         auth && auth.role === "user" ?   <div className='dropdown-btn position-relative'>
//         <UnopDropdown
//           align="RIGHT"
//           trigger={<button className='bell-btn'><img src={bell} alt="bell" style={{width:"28px"}} /></button>}
//         >
//           <ul className='dropdown-ul'
//             style={{
//               marginTop:"5px",
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//               boxSizing: 'border-box',
//               padding: '30px',
//               width: '300px'
//             }}
//           >
//             {
//               res?.data?._id ?
//                 <li>
//                  <div className='d-flex justify-content-between align-items-center'>
//                  <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/product/${res.data.product?._id}`}>
//                  <img src={res.data.product?.image} style={{width:"40px"}} alt="image" /></Link>
//                   <p>{res.data.product?.name}</p>
//                   <p>{res.data.totalPrice}</p>
//                  </div>
//                  <Link className='order-payment mt-2' onClick={()=> CloseDropDown()} to={"order/payment"}>الشراء</Link>
//                 </li> : <li>لايوجد منتجات حتي الأن</li>

//             }
//           </ul>

//         </UnopDropdown>
//         {
//             res?.data?._id ?<span className='notification'></span> :null
//           }
//       </div>  :null
//       }

//       {
//         auth ?<button onClick={()=>Logout()} className='nav-btn' style={{backgroundColor:"#242672"}}> <img src={logout} style={{width:"20px",marginLeft:"15px"}}  alt="" /> تسجيل خروج </button> : <Link onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} to='/login'><button className='nav-btn'> <FontAwesomeIcon icon={faUser} /> تسجيل الدخول </button></Link>
//       }
//     </div>
//   </div>
// </nav>
//     </>
//   )
// }

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/mazady-logo-white.png";
import { Typography } from "@mui/material";

const settings = [
  {
    title: "الصفحة الشخصية",
    link: "/profile",
  },
];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({name: 'Test'});

  React.useEffect(() => {
    if(localStorage.user && localStorage.user != 'undefined'){
      setUser(JSON.parse(localStorage.user))
    }
  }, [])


  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 5);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      sx={{
        direction: "rtl",
        backgroundColor: isScrolled ? "#442DB9" : "transparent",
        paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
        paddingY: "2px",
        boxShadow: isScrolled
          ? "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
          : "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ width: "70px" }} alt="logo" />
        </Link>

        {localStorage?.user ? (
          <Box>
            <Tooltip title="Open settings">
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(101.96deg, #01ece7 5.37%, rgb(7 247 176 / 41%) 100.31%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "22px",
                }}
                onClick={handleOpenUserMenu}
              >
                {user.name[0]}
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={()=>{
                  handleCloseUserMenu()
                  navigate(setting.link)
                }}>
                    {setting.title}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser(null);
                  window.location.href = "/";
                }}
              >
                <Typography>تسجيل الخروج</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Link className="navbar-brand" to="/login">
            تسجيل الدخول
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
