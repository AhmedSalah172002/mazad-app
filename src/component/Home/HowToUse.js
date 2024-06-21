import { Box, Typography } from "@mui/material";
import React from "react";
import htu1 from "../../images/htu1.svg";
import htu2 from "../../images/htu2.svg";
import htu3 from "../../images/htu3.svg";

const HowToUse = () => {
  const howToUse = [
    {
      image: htu3,
      title: "تسجيل الدخول",
      desc: "غير مطلوب ادراج بطاقة الإئتمان",
    },
    {
      image: htu2,
      title: "مزايدة بدون قيود",
      desc: "المزايدة مجانية و تدفع النقود في حالة الفوز فقط",
    },
    {
      image: htu1,
      title: "إربح",
      desc: "متعة , إثارة و صفقات رائعة يمكنك الحصول عليها",
    },
  ];
  return (
    <>
      <Box
      id='how_use'
        sx={{
          paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
          marginY: "15vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3AB8C029",
            padding: "50px",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "35px" }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                color: "#2E3D62",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              كيفية الإستخدام
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#2E3D62",
                fontWeight: "600",
              }}
            >
              ثلاث طرق بسيطة و سهلة
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {howToUse.map((ele, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px auto 20px",
                  textAlign: "center",
                }}
              >
                <img
                  src={ele.image}
                  style={{
                    display: "block",
                    margin: "15px auto 10px",
                    width: "180px",
                    height: "200px",
                  }}
                  alt="htu"
                />
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "600",
                  }}
                >
                  {ele.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="body2"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "600",
                  }}
                >
                  {ele.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HowToUse;
