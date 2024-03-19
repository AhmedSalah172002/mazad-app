import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,

  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import logo from "../../../images/mazady-logo-white.png";
import authTop from "../../../images/auth-top.png";
import authBottom from "../../../images/auth-bottom.png";


const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const ForgetPassword = () => {
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
                  padding: "40px 15px",
                  borderRadius: " 10px 0 0 10px",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    color: "#403da8",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  نسيت كلمة المرور
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    dir="rtl"
                    type="email"
                    label="أدخل البريد الالكتروني"
                    sx={{ marginBottom: "10px", width: "70%" }}
                  />
                </Box>

                <Button
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
                  تأكيد
                </Button>
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
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "100px",
                  }}
                />

                <img
                  src={authTop}
                  alt="authTop"
                  style={{
                    width: "120px",
                    position: "absolute",
                    right: "0",
                    top: "-5px",
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

export default ForgetPassword;
