import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import SignupHook from "../../hook/auth/RegisterHook";
import logo from "../../images/mazady-logo.png";
import authTop from "../../images/auth-top.png";
import authBottom from "../../images/auth-bottom.png";
import LoginHook from "../../hook/auth/LoginHook";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const Login = () => {
  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit] =
    LoginHook();

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#21204c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
          dir="rtl"
        >
          <Box sx={{ width: "min(900px,100%)" }}>
            <Grid container>
              <Grid
                item
                md={12}
                lg={8}
                sx={{
                  backgroundColor: "#d9d9d9",
                  padding: "15px",
                  borderRadius: " 10px 0 0 10px",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ display: "block", margin: "auto", width: "80px" }}
                />
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ color: "#403da8", textAlign: "center" }}
                >
                  تسجيل الدخول
                </Typography>

                <TextField
                  dir="rtl"
                  type="email"
                  label="البريد الالكترونى"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  type="password"
                  dir="rtl"
                  label="كلمة المرور"
                  fullWidth
                  margin="normal"
                />
                <Typography variant="body2">
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to="/forget-password"
                  >
                    هل نسيت كلمة المرور ؟
                  </Link>
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    background: "rgb(34,33,89)",
                    background:
                      "linear-gradient(90deg, rgba(34,33,89,1) 11%, rgba(67,64,164,1) 33%, rgba(100,95,238,1) 48%, rgba(34,33,89,1) 82%, rgba(47,46,119,1) 89%)",
                    color: "white",
                    fontSize: "22px",
                    width: "fit-content",
                    display: "block",
                    margin: "10px auto",
                    padding: "10px 70px",
                    borderRadius: "10px",
                  }}
                >
                  تسجيل الدخول
                </Button>

                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to="/register"
                  >
                    ليس لديك حساب؟ انشاء حساب
                  </Link>
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                lg={4}
                sx={{
                  backgroundColor: "#403da8",
                  position: "relative",
                  display: { md: "none", lg: "block" },
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    marginLeft: "5px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "100%",
                  }}
                >
                  أهلا بكم في موقع مزادى
                </Typography>
                <img
                  src={authTop}
                  alt="authTop"
                  style={{
                    width: "160px",
                    position: "absolute",
                    right: "0",
                    top: "-7px",
                  }}
                />
                <img
                  src={authBottom}
                  alt="authTop"
                  style={{
                    width: "180px",
                    position: "absolute",
                    left: "0px",
                    bottom: "-20px",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Login;
