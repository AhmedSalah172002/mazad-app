import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ProductCard from "./ProductCard";

const HomeProducts = ({ items }) => {
 
  return (
    <>
      <Box
        sx={{
          paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
          direction: "rtl",
          marginY: "15vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "35px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#2E3D62",
              fontWeight: "600",
            }}
          >
            أحدث المزادات
          </Typography>
          <Link
            to="/products"
            style={{
              color: "#2E3D62",
              fontWeight: "600",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            عرض الكل{" "}
            <Icon icon="ep:d-arrow-left" style={{ marginRight: "10px" }} />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {sm:'center',md:"space-between", lg:"space-between"},
            flexWrap: "wrap",
            gap: {sm:'15px',md:"5px", lg:"5px"},
          }}
        >
          {items?.length > 0
            ? items.map((item) => <ProductCard status={item?.status} item={item} />)
            : <p style={{textAlign:'center',width:'100%',fontSize:'22px'}}>لا يوجد منتجات حتي الأن </p>}
        </Box>
      </Box>
    </>
  );
};

export default HomeProducts;
