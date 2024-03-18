import React, { Children, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function HiddenFooter({children}) {

    const location = useLocation();
    const [showFooter , setshowFooter]= useState(false)
    useEffect(()=>{
        console.log('location is : ' , location)
        
            if (location.pathname === "/login"  ) {
                setshowFooter(false);
            } else {
                setshowFooter(true);
                
            }
    },[location])
  return (
    <div>{showFooter && children}</div>
  )
}
