import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import logo from "../../images/mazady-logo.png";
import authTop from "../../images/auth-top.png";
import authBottom from "../../images/auth-bottom.png";
import LoginHook from "../../hook/auth/LoginHook";
import { Link } from "react-router-dom";
import { NozProgress } from "nozolan-library";

const Login = () => {
  const {
    email,
    password,
    loading,
    errors,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  } = LoginHook();
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

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
          <Box
            sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "900px" } }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
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
                  sx={{
                    color: "#403da8",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  تسجيل الدخول
                </Typography>
                <form onSubmit={onSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <TextField
                      error={errors.has("email")}
                      helperText={errors.get("email")}
                      dir="rtl"
                      type="email"
                      label="البريد الالكترونى"
                      sx={{ marginBottom: "10px", width: "70%" }}
                      value={email}
                      onChange={(e) => {
                        onChangeEmail(e);
                      }}
                    />

                    <TextField
                      error={errors.has("password")}
                      helperText={errors.get("password")}
                      type="password"
                      dir="rtl"
                      label="كلمة المرور"
                      sx={{ marginBottom: "10px", width: "70%" }}
                      value={password}
                      onChange={(e) => {
                        onChangePassword(e);
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ width: "70%", margin: "0 auto 15px" }}
                  >
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
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    style={{
                      background: "#403DA8",
                      background:
                        "linear-gradient(256.46deg, #000000 -30.19%, #403DA8 52.98%, #000000 160.52%)",
                      boxShadow: "0px 2px 9px 2px rgba(0, 0, 0, 0.3)",
                      color: "white",
                      fontSize: "22px",
                      width: "fit-content",
                      display: "block",
                      margin: "10px auto",
                      padding: "10px 70px",
                      borderRadius: "10px",
                    }}
                  >
                    تسجيل الدخول{" "}
                  </Button>
                </form>
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
                  display: { xs: "none", sm: "none", md: "none", lg: "block" },
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
