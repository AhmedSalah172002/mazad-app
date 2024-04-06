import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import heroImage from "../../images/hero.svg";

const Hero = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#442DB9",
          height: "100vh",
          borderRadius: "0px 0px 400px 400px",
          position: "relative",
          overflow: "hidden",
          padding: "15vh 0 100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "-120px",
            left: "-50px",
            width: "70%",
            height: "70%",
            backgroundColor: "black",
            background:
              "linear-gradient(101.96deg, #6D52E0 5.37%, rgba(59, 45, 122, 0.41) 100.31%)",
            borderRadius: "0px 300px",
            transform: "rotate(170deg)",
          }}
        ></Box>
        <Grid container>
          <Grid
            item
            md={12}
            lg={6}
            sx={{
              zIndex: "5",
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <img
              src={heroImage}
              style={{ display: "block", marginLeft: "5px", width: "650px" }}
              alt="hero_image"
            />
          </Grid>
          <Grid
            item
            md={12}
            lg={6}
            sx={{
              zIndex: "5",
              textAlign: "right",
              marginTop: "50px",
              paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#10D5E2",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              مزاد الجيل القادم
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: "#ffffff",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              ! أعثر على صفقتك القادمة
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#ffffff",
                fontWeight: "500",
                marginBottom: "15px",
              }}
            >
              المزاد العلني عبر الإنترنت هو المكان الذي يذهب إليه الجميع للتسوق
              و البيع و إقتناء الأشياء الثمينة و القديمة{" "}
            </Typography>

            <Button
              sx={{
                background:
                  "linear-gradient(180deg, #FFC547 21.28%, #FF9454 84.75%) !important",
                display: "block",
                margin: "50px auto",
                width: "fit-content",
                padding: "15px 80px",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: "600",
                color:'#ffffff'
              }}
            >
              إبدأ في البحث{" "}
            </Button>
          </Grid>
        </Grid>
        
      </Box>
    </>
  );
};

export default Hero;
