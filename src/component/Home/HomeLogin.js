import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import star1 from "../../images/star1.svg";
import star2 from "../../images/star2.svg";
import { useNavigate } from "react-router-dom";

const HomeLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          marginY: "15vh",
          background:
            " radial-gradient(92.46% 92.46% at 50% 50%, #6965F2 0%, #3C39A3 80.14%, #9747FF 100%)",
          height: "40vh",
          width: { xs: "90%", sm: "90%", md: "90%", lg: "70%" },
          marginX: "auto",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{ marginBottom: "15px" }}
          >
            <Button
              sx={{
                background: "#ffffff !important",
                display: "block",
                margin: "auto",
                width: "fit-content",
                padding: "15px 80px",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: "600",
                color: "#6965F2",
                "&:hover": {
                  background: "#ffffff",
                },
              }}
              onClick={()=> navigate("/login") }
            >
              تسجيل الدخول{" "}
            </Button>{" "}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{ marginBottom: "15px", textAlign: "center" }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{
                color: "#ffffff",
                fontWeight: "600",
              }}
            >
              سجل الان مجانا
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#ffffff",
                fontWeight: "600",
              }}
            >
              و إبدأ رحلتك في المزادات
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            top: "-150px",
            right: "20%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            border: "40px solid #FFFFFF24",
            backgroundColor: "transparent",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "-130px",
            left: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            border: "40px solid #FFFFFF24",
            backgroundColor: "transparent",
          }}
        ></Box>
        <img
          src={star1}
          style={{
            position: "absolute",
            bottom: "50px",
            left: "90px",
            width: "80px",
          }}
          alt="cat"
        />
          <img
          src={star2}
          style={{
            position: "absolute",
            bottom: "0px",
            left: "220px",
            width: "40px",
          }}
          alt="cat"
        />
      </Box>
    </>
  );
};
export default HomeLogin;
