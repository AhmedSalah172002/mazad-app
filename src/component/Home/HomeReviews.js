import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const HomeReviews = () => {
  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(98.66deg, #6D52E0 25.38%, rgba(59, 45, 122, 0.42) 97.45%)",
          padding: "50px 1rem",
          marginY:'15vh'
        }}
      >
        <Box sx={{ textAlign: "center", margin: "25px 0px 15vh" }}>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#ffffff",
              fontWeight: "600",
            }}
          >
            آراء بعض المستخدمين
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: "#ffffff",
              fontWeight: "600",
            }}
          >
            .عملنا الشاق يؤتي ثماره. تقييمات رائعة من عملاء رائعين
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
            direction:'rtl',
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
            color:'#2E3D62'
          }}
        >
          <Box
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              background: "#FFFFFF",
              padding: "20px 45px",
              width: "350px",
              borderRadius: "15px",
              margin:"auto"
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "600",
                textAlign: "center",
                marginBottom:'10px'
              }}
            >
              لقد إستخدمت هذه المنصة في الشراء و كانت تجربة التوصيل أكثر من
              رائعة
            </Typography>
            <hr />
          </Box>
          <Box
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              background: "#FFFFFF",
              padding: "20px 45px",
              width: "350px",
              borderRadius: "15px",
              margin:"auto"
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "600",
                textAlign: "center",
                marginBottom:'10px'
              }}
            >
              لقد إستخدمت هذه المنصة في الشراء و كانت تجربة التوصيل أكثر من
              رائعة
            </Typography>
            <hr />
          </Box>
          <Box
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              background: "#FFFFFF",
              padding: "20px 45px",
              width: "350px",
              borderRadius: "15px",
              margin:"auto"
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "600",
                textAlign: "center",
                marginBottom:'10px'
              }}
            >
              لقد إستخدمت هذه المنصة في الشراء و كانت تجربة التوصيل أكثر من
              رائعة
            </Typography>
            <hr />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeReviews;
