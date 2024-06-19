import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function HiddenNav({ children }) {
  const location = useLocation();
  const [showNavbar, setshowNavbar] = useState(false);
  useEffect(() => {

    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/new-password" ||
      location.pathname === "/email-authentication-code" ||
      location.pathname === "/forget-password"
    ) {
      setshowNavbar(false);
    } else {
      setshowNavbar(true);
    }
  }, [location]);
  

  return <div>{showNavbar && children}</div>;
}
