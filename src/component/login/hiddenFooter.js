import React, { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function HiddenFooter({ children }) {
  const location = useLocation();
  const [showFooter, setshowFooter] = useState(false);
  useEffect(() => {

    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/new-password" ||
      location.pathname === "/email-authentication-code" ||
      location.pathname === "/forget-password"
    ) {
      setshowFooter(false);
    } else {
      setshowFooter(true);
    }
  }, [location]);
  return <div>{showFooter && children}</div>;
}
