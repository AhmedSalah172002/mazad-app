import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import bele from "../../images/bele.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const ProductCard = ({ status, item }) => {
  // time

  const calculateTime = (date, time) => {
    const now = new Date();
    const targetDate = new Date(date?.split("T")[0]);
    const timeDifference = targetDate.getTime() - now.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const desiredTime = new Date();
    const startTime = time.split(":");
    desiredTime.setHours(+startTime[0], +startTime[1], +startTime[2], 0);

    const timeDifferenceMillis = desiredTime.getTime() - now.getTime();
    const hoursDiff = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
    const minutesDiff = Math.floor(
      (timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsDiff = Math.floor((timeDifferenceMillis % (1000 * 60)) / 1000);

    return {
      days,
      hours: hoursDiff,
      minutes: minutesDiff,
      seconds: secondsDiff,
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTime(item?.date, item?.startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime(item?.date, item?.startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [item?.date, item?.startTime]);

  // animation
  const handleMouseEnter = () => {
    const sliders = document.querySelectorAll(".box-product-card");
    sliders.forEach(function (slider, i) {
      slider.addEventListener("mouseenter", function (event) {
        document.querySelectorAll(".swiper-button-next")[i].click();
        return false;
      });
      slider.addEventListener("mouseleave", function (event) {
        document.querySelectorAll(".swiper-button-prev")[i].click();
        return false;
      });
    });
  };

  return (
    <>
      <Link to={`/product/${item._id}`}>
        <Box
          className="box-product-card"
          sx={{
            borderRadius: "15px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            width: "320px",
            padding: "0px 0px 15px",
            position: "relative",
            cursor: "pointer",
            margin: " 0 auto 20px",
            background: "#fff",
            overflow: "hidden",
          }}
          onMouseEnter={handleMouseEnter}
        >
          <Box
            style={{
              margin: "0px auto 20px",
              width: "100%",
              height: "250px",
              borderRadius: "15px 15px 0 0",
              overflow: "hidden",
            }}
          >
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              modules={[EffectFade, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={item.image}
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px 15px 0 0",
                  }}
                  alt="prod"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={item.images[1]}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px 15px 0 0",
                  }}
                  alt="prod"
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "0 20px 10px",
            }}
          >
            <img
              src={item?.category?.image}
              style={{ width: "22px", height: "22px" }}
              alt="img"
            />
            <Typography
              variant="body1"
              component="body1"
              sx={{
                color: "#2E3D62",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              {item?.category?.name}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: "#2E3D62",
              fontWeight: "800",
              marginBottom: "15px",
              paddingX: "20px",
              textAlign: "right",
            }}
          >
            {item.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingX: "20px",
            }}
          >
            <img
              src={bele}
              alt="img"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "3px solid #403DA8",
                overflow: "hidden",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                component="body1"
                sx={{
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
              >
                جود بيلينجهام
              </Typography>
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "500",
                  fontSize: "12px",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#4bae4f",
                    display: "inline-block",
                    marginLeft: "8px",
                  }}
                ></Box>{" "}
                بائع موثوق
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: "#2E3D62",
              fontWeight: "700",
              textAlign: "left",
              paddingX: "20px",
              marginTop: "15px",
            }}
          >
            <sub style={{ fontSize: "12px" }}>جنية مصرى</sub>{" "}
            {item.initialPrice}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              top: "0px",
              left: "0px",
              borderRadius: "15px 0px 15px 0px",
              width: "100px",
              height: "40px",
              zIndex: "4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              backgroundColor:
                status === "not-started"
                  ? "#5D5D5D"
                  : status === "start-now"
                  ? "#62EC21"
                  : "#E62C2C",
            }}
          >
            {status === "not-started"
              ? "لم يبدأ بعد"
              : status === "start-now"
              ? "جارية"
              : "منتهية"}
          </Box>
          <Box
            sx={{
              direction: "ltr",
              position: "absolute",
              bottom: "220px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "10px",
              width: "220px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              zIndex: "4",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
                }}
              >
                {timeLeft?.days}
              </Typography>
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
                }}
              >
                {timeLeft?.hours}
              </Typography>
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
                }}
              >
                {timeLeft?.minutes}
              </Typography>
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
                }}
              >
                {timeLeft?.seconds}
              </Typography>
              <Typography
                variant="body2"
                component="body2"
                sx={{
                  fontWeight: "700",
                }}
              >
                ثانية
              </Typography>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default ProductCard;
