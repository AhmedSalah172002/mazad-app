import React, { useEffect, useState } from 'react'

const ProtectedRouteHook = () => {

    const [userData, setUserData] = useState()
    const [isUser, setIsUser] = useState()
    const [isAdmin, setIsAdmin] = useState()


    React.useEffect(() => {
        if(localStorage.user && localStorage.user != 'undefined'){
            setUserData(JSON.parse(localStorage.user))
        }
    }, [])


    useEffect(() => {

        if (userData != null) {
            if (userData.role === "user") {
                setIsUser(true)
                setIsAdmin(false)
            } else {
                setIsUser(false)
                setIsAdmin(true)
            }
        } else {
            setIsAdmin(false)
            setIsUser(false)
        }
    }, [])



    return [isUser, isAdmin, userData]
}

export default ProtectedRouteHook