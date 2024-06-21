import React, { useEffect, useState } from 'react'

const ProtectedRouteHook = () => {

    const [isUser, setIsUser] = useState()
    const [isMerchant, setIsMerchant] = useState()
    const [isAdmin, setIsAdmin] = useState()

    let auth;
   
    React.useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            auth = JSON.parse(localStorage.getItem("user"));
          }
    }, [])

    useEffect(() => {

        if (auth != null) {
            if (auth.role === "user") {
                setIsUser(true)
                setIsAdmin(false)
                setIsMerchant(false)

            } else if (auth.role ==="merchant") {
                setIsUser(false)
                setIsMerchant(true)
                setIsAdmin(false)
            }else{
                setIsUser(false)
                setIsMerchant(false)
                setIsAdmin(true)
            }
        } else {
            setIsUser(false)
            setIsMerchant(false)
            setIsAdmin(false)
        }
    }, [])



    return [isUser, isAdmin, isMerchant]
}

export default ProtectedRouteHook