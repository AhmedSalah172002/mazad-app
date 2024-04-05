import React from "react";
import cat1 from "../../images/cat1.svg";
import cat2 from "../../images/cat2.svg";
import cat3 from "../../images/cat3.svg";
import cat4 from "../../images/cat4.svg";
import cat5 from "../../images/cat5.svg";
import cat6 from "../../images/cat6.svg";
import { Box, Typography } from "@mui/material";

const Category = () => {
  const categories = [
    { image: cat1, name: "ساعات" },
    { image: cat2, name: "مجوهرات" },
    { image: cat3, name: "سيارات" },
    { image: cat4, name: "عقارات" },
    { image: cat5, name: "رياضة" },
    { image: cat6, name: "إلكترونيات" },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          padding:'0px 20px',
          flexWrap: "wrap",
          transform: "translateY(-50px)",
        }}
      >
        {categories.map((cat, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: "#ffffff",
              padding: "10px 2px",
              borderRadius: "15px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              width: {xs:'100%', sm:'100%' , md:'50%', lg:"12%"},
              textAlign: "center",
              zIndex: "50",
            }}
          >
            <img
              src={cat.image}
              style={{
                display: "block",
                margin: "15px auto 10px",
                width: "80px",
                height: "80px",
              }}
              alt="cat"
            />
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: " #6F0D0D",
                fontWeight: "600",
              }}
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Category;
