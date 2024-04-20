import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import prod from "../../images/prod.jpg";

const ProductCard = ({ status, item }) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "15px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          width: "280px",
          padding: "0px 0px 20px",
          position: "relative",
          cursor: "pointer",
          margin: " 0 auto 20px",
        }}
      >
        <img
          src={item.image}
          style={{
            display: "block",
            margin: "0px auto 10px",
            width: "100%",
            height: "250px",
            borderRadius: "15px 15px 0 0",
            marginBottom: "15px",
          }}
          alt="prod"
        />
        <Typography
          variant="h5"
          component="h5"
          sx={{
            color: "#2E3D62",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          {item.name}
        </Typography>
        <Box
          sx={{ paddingX: "25px", display: "flex", justifyContent: "center" }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: "#2E3D62",
              fontWeight: "600",
            }}
          >
            ج.م {item.initialPrice}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: "#2E3D62",
              fontWeight: "600",
              marginX: "5px",
            }}
          >
            |
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: "#2E3D62",
              fontWeight: "600",
            }}
          >
            ج.م {item.lowestBidValue}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            left: "0px",
            borderRadius: "15px 0px 15px 0px",
            width: "100px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            backgroundColor:
              status === "E"
                ? "#5D5D5D"
                : status === "S"
                ? "#62EC21"
                : "#E62C2C",
          }}
        >
          {status === "E" ? "لم يبدأ بعد" : status === "S" ? "جارية" : "منتهية"}
        </Box>
        <Box
          sx={{
            direction: "ltr",
            position: "absolute",
            bottom: "130px",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "15px",
            width: "220px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#2E3D62",
            backgroundColor: " rgba(255, 255, 255, 0.7)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              00
            </Typography>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              يوم
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: "600",
              marginX: "8px",
            }}
          >
            :
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              00
            </Typography>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              ساعة
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: "600",
              marginX: "8px",
            }}
          >
            :
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              00
            </Typography>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              دقيقة
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: "600",
              marginX: "8px",
            }}
          >
            :
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              00
            </Typography>
            <Typography
              variant="body2"
              component="body2"
              sx={{
                fontWeight: "500",
              }}
            >
              ثانية
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
