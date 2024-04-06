import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import info1 from "../../images/info1.svg";
import info2 from "../../images/info2.svg";
import info3 from "../../images/info3.svg";

const gridItems = [
  {
    imageSrc: info1,
    title: "تعدد الخيارات",
    description:
      "تتيح لك منصة مزادي في المزايدة في او الشراء بشكل مباشر دون الدخول في المزاد",
  },
  {
    imageSrc: info2,
    title: "طبقات حماية متعددة",
    description:
      "يوجد لدنيا طبقات حماية قوية و متعددة قادرة على حماية البيانات الخاصة بك , مشترايتك و طرق الدفع",
  },
  {
    imageSrc: info3,
    title: "المشاركة المتعدد",
    description:
      "يمكنك المشاركة في اكثر من مزاد في النفس الوقت مع سهولة في المزايدة و الدفع",
  },
];

const WhyMazady = () => {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const handleToggleDescription = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", color: "#2E3D62", marginTop: "50px" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          لماذا منصة مزادي ؟
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          توفر لك منصة مزادي الكثير من المميزات في التصفح و البحث عن منتجات و
          اشياء ثمينة و تتيح لك طرق دفع متنوعة وسهلة{" "}
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          display: "flex",
          gap: "70px",
          justifyContent: "center",
          paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
          marginTop: { xs: "5vh", sm: "5vh", lg: "25vh" },
        }}
      >
        {gridItems.map((item, index) => (
          <Grid item key={index} md={12} lg={3.5}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: "10px 2px 20px",
                borderRadius: "15px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                textAlign: "center",
                zIndex: "50",
              }}
            >
              <img
                src={item.imageSrc}
                style={{
                  display: "block",
                  margin: "15px auto 10px",
                  width: "150px",
                  height: "200px",
                }}
                alt="cat"
              />
              <Box>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "600",
                    padding: "15px",
                    maxHeight: expandedIndices.includes(index)
                      ? "none"
                      : "100px",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
              {item.description.length > 20 && (
                <Button
                  onClick={() => handleToggleDescription(index)}
                  style={{
                    color: "#442DB9",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  {expandedIndices.includes(index)
                    ? "أقرأ أقل"
                    : "قراءة المزيد"}
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default WhyMazady;
