import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Login from "../component/login/Login";
import LoginCont from "../component/login/LoginCont";

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
