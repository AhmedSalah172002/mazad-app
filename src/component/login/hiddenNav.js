import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function HiddenNav({children}) {
    
    const location = useLocation();
    const [showNavbar , setshowNavbar]= useState(false)
    useEffect(()=>{
        console.log('location is : ' , location)
        
            if (location.pathname ==="/login" ) {
                setshowNavbar(false);
            } else {
                setshowNavbar(true);
                
            }
    },[location])


  return (
    <div>{showNavbar && children}</div>
  )
}
