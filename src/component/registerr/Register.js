import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import logo from "../../images/mazady-logo.png";
import authTop from "../../images/auth-top.png";
import authBottom from "../../images/auth-bottom.png";
import { Icon } from "@iconify/react";
import RegisterHook from "../../hook/auth/RegisterHook";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const Register = () => {
  const {
    name,
    email,
    phone,
    password,
    passwordConfirm,
    role,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setPasswordConfirm,
    setRole,
    loading,
    errors,
    handleSubmit,
  } = RegisterHook();

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
          <Box sx={{ width: { xs:'100%', sm:'100%', md:'100%', lg:"900px"} }}>
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
                  sx={{ color: "#403da8", textAlign: "center",marginBottom:'15px' }}
                >
                  إنشاء حساب جديد
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
                    error={errors.has("email")}
                    helperText={errors.get("email")}
                    dir="rtl"
                    type="email"
                    label="البريد الالكترونى"
                    sx={{ marginBottom: "10px", width: "70%" }}
                    value={email}
                    onChange={(e) => {
                      errors.has("email") && errors.delete("email");
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    error={errors.has("name")}
                    helperText={errors.get("name")}
                    dir="rtl"
                    label="اسم المستخدم"
                    sx={{ marginBottom: "10px", width: "70%" }}
                    value={name}
                    onChange={(e) => {
                      errors.has("name") && errors.delete("name");
                      setName(e.target.value);
                    }}
                  />
                  <TextField
                    error={errors.has("phone")}
                    helperText={errors.get("phone")}
                    dir="rtl"
                    label="رقم الهاتف"
                    sx={{ marginBottom: "10px", width: "70%" }}
                    value={phone}
                    onChange={(e) => {
                      errors.has("phone") && errors.delete("phone");
                      setPhone(e.target.value);
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
                      errors.has("password") && errors.delete("password");
                      setPassword(e.target.value);
                    }}
                  />
                  <TextField
                    error={errors.has("passwordConfirm")}
                    helperText={errors.get("passwordConfirm")}
                    type="password"
                    dir="rtl"
                    label="تأكيد كلمة المرور"
                    sx={{ marginBottom: "10px", width: "70%" }}
                    value={passwordConfirm}
                    onChange={(e) => {
                      errors.has("passwordConfirm") &&
                        errors.delete("passwordConfirm");
                      setPasswordConfirm(e.target.value);
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px",
                    margin: "15px 0",
                  }}
                >
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={role}
                    aria-label="Platform"
                    sx={{
                      border: errors.has("role") ? "1px solid red" : "",
                    }}
                    onChange={(e, newValue) => {
                      errors.has("role") && errors.delete("role");
                      setRole(newValue);
                    }}
                  >
                    <ToggleButton value="merchant">
                      {" "}
                      <Icon icon="mingcute:auction-fill" width={20} />
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                          color: "#403da8",
                          textAlign: "center",
                          marginLeft: "5px",
                        }}
                      >
                        تاجر
                      </Typography>
                    </ToggleButton>
                    <ToggleButton value="user">
                      {" "}
                      <Icon
                        icon="fa-solid:user-tie"
                        width={20}
                        sx={{ display: "block", margin: "auto" }}
                      />
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ color: "#403da8", marginLeft: "5px" }}
                      >
                        مستخدم
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                {errors.has("role") && (
                  <Typography sx={{ textAlign: "center", color: "red" }}>
                    {errors.get("role")}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  style={{
                    background: "#403DA8",
                    background:
                      "linear-gradient(256.46deg, #000000 -30.19%, #403DA8 52.98%, #000000 160.52%)",
                    boxShadow: "0px 2px 9px 2px rgba(0, 0, 0, 0.3)",
                    color: "white",
                    fontSize: "22px",
                    width: "fit-content",
                    display: "flex",
                    margin: "25px auto",
                    padding: "10px 70px",
                    borderRadius: "10px",
                  }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  إنشاء حساب
                  {loading && <CircularProgress size={24} color="inherit" />}
                </Button>
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
                    width: "230px",
                    position: "absolute",
                    right: "0",
                    top: "-8px",
                  }}
                />
                <img
                  src={authBottom}
                  alt="authTop"
                  style={{
                    width: "230px",
                    position: "absolute",
                    left: "0px",
                    bottom: "-26px",
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

export default Register;
