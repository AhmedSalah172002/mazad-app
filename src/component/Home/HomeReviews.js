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
          <Box sx={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>

          </Box>
        </Box>
    </>
  );
};

export default HomeReviews;
