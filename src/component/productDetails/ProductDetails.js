import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Icon } from "@iconify/react";
import userLogo from "../../images/assets/images/avatars/avatar_25.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import GetProductDetails from "../../hook/products/GetProductDetails";
import { NozProgress } from "nozolan-library";
import {
  convertTimeTo12Hours,
  convertToArabicDate,
} from "../utils/convertUTCToLocalTime";
import CheckInsurancePaymentHook from "../../hook/checkout/CheckInsurancePaymentHook";
import TerminateProductStatusHook from "../../hook/products/TerminateProductStatusHook";
import { ToastContainer } from "react-toastify";
import { RateMerchantDialog } from "./RateMerchantDialog";
import { ReviewMerchant } from "./ReviewMerchant";

const customRenderItem = (item) => {
  return (
    <div className="image-gallery-image">
      <img
        src={item.original}
        alt={item.originalAlt}
        style={{ borderRadius: "15px", width: "100%", height: "450px" }}
      />
    </div>
  );
};

const ProductDetails = () => {
  let { productId } = useParams();
  const [item] = GetProductDetails(productId);
  const [handelCheckInsurancePayment, loading] = CheckInsurancePaymentHook();
  const [handleTerminateProduct] = TerminateProductStatusHook();
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(false);

  useEffect(() => {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user);
      setLoggedUser(user);
    }
  }, []);

  let auth;
  if (localStorage.getItem("user") !== null) {
    auth = JSON.parse(localStorage.getItem("user"));
  }
  const images = item?.images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // time

  const calculateTime = (date, time) => {
    const difference =
      new Date(`${date?.split("T")[0]}T${time}:00+03:00`) - new Date();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return difference > 0
      ? { days, hours, minutes, seconds }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTime(
      item?.date,
      item?.status === "not-started" ? item?.startTime : item?.endTime
    )
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        calculateTime(
          item?.date,
          item?.status === "not-started" ? item?.startTime : item?.endTime
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [item?.date, item?.startTime, item?.endTime, item?.status]);

  if (!item || images?.length < 1) {
    return (
      <>
        <Box sx={{ margin: "100px 15px 80vh", direction: "rtl" }}>
          <NozProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
          direction: "rtl",
          marginY: "15vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={5}
            sx={{ marginBottom: "15px" }}
          >
            <ImageGallery
              items={images || []}
              showPlayButton={false}
              showFullscreenButton={false}
              renderItem={customRenderItem}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={7}
            sx={{ marginBottom: "15px" }}
          >
            <Box sx={{ padding: "15px" }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  color: "#2E3D62",
                  fontWeight: "700",
                  marginBottom: "35px",
                }}
              >
                {item?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  gap: "5px",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  <Icon
                    icon="fluent:phone-12-filled"
                    width={30}
                    style={{ color: "#403DA8" }}
                  />
                  {item?.user?.phone}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  <Icon
                    icon="mingcute:location-2-fill"
                    width={30}
                    style={{ color: "#403DA8" }}
                  />
                  القاهرة, مصر
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  <Icon
                    icon="gravity-ui:persons"
                    width={30}
                    style={{ color: "#403DA8" }}
                  />
                  البائع و المشتري بشكل مباشر
                </Box>
              </Box>
              <hr />
              <Box
                sx={{
                  background: "#9747FF2B",
                  padding: "40px 20px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  لا تفوت هذا العرض , سوف{" "}
                  {item?.status === "not-started" ? "يبدأ" : "ينتهي"} بعد{" "}
                </Typography>
                <Box
                  sx={{
                    direction: "ltr",
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
                      {timeLeft.days}
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
                      {timeLeft.hours}
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
                      {timeLeft.minutes}
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
                      {timeLeft.seconds}
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
              <hr />
              <Grid sx={{ marginY: "15px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "35px",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="body2"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      المنشأ :
                    </Typography>
                    <Typography
                      variant="body21"
                      component="body1"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      مصر
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "35px",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="body2"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      سنة الصنع :
                    </Typography>
                    <Typography
                      variant="body21"
                      component="body1"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      2024
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "35px",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="body2"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      التصنيف :
                    </Typography>
                    <Typography
                      variant="body21"
                      component="body1"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      {item?.category?.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "35px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontSize: "18px",
                    }}
                  >
                    وقت النهاية :
                  </Typography>
                  <Typography
                    variant="body21"
                    component="body1"
                    sx={{
                      fontSize: "18px",
                    }}
                  >
                    {convertToArabicDate(item?.date?.split("T")[0])}
                    {"  -  "}
                    {convertTimeTo12Hours(`${item?.endTime}:00`)}
                  </Typography>
                </Box>
              </Grid>
              <hr />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
                >
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontSize: "18px",
                    }}
                  >
                    السعر المبدأي
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    {item?.initialPrice}{" "}
                    <sub style={{ fontSize: "15px" }}>جنية مصرى</sub>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  {item?.status === "not-started" ||
                  item?.status === "start-now" ? null : (
                    <>
                      <Typography
                        variant="body1"
                        component="body1"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "800",
                        }}
                      >
                        {item?.mazad?.length} مناقصة
                      </Typography>
                      <Typography
                        variant="body1"
                        component="body1"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "800",
                          color: "#403DA8",
                        }}
                      >
                        "اظهار السجل"
                      </Typography>
                    </>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(256.46deg, #000000 -30.19%, #403DA8 52.98%, #000000 160.52%)",
                      boxShadow: "0px 2px 9px 2px rgba(0, 0, 0, 0.3)",
                      color: "white",
                      fontSize: "18px",
                      width: "fit-content",
                      display: "block",
                      margin: "10px auto",
                      padding: "10px 30px",
                      borderRadius: "50px",
                      opacity:
                        item?.status === "not-started" ||
                        item?.status === "finished"
                          ? ".5"
                          : "1",
                    }}
                    disabled={
                      item?.status === "not-started" ||
                      item?.status === "finished"
                    }
                    onClick={() =>
                      auth?.role === "merchant"
                        ? handleTerminateProduct(productId)
                        : item?.involved?.some((e) => e.user === auth._id)
                        ? navigate(`/user/mazad/${productId}`)
                        : handelCheckInsurancePayment(productId)
                    }
                  >
                    {auth?.role === "merchant"
                      ? "انهاء المزاد"
                      : "المزايدة الأن"}
                  </Button>
                </Box>
              </Box>
              <hr />
              <Box>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: "700",
                    marginBottom: "25px",
                  }}
                >
                  عن المنتج :
                </Typography>
                <Typography
                  variant="body1"
                  component="body1"
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  {item?.description}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: "700",
                    marginBottom: "35px",
                  }}
                >
                  عن البائع :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <img
                      src={item?.user?.image || userLogo}
                      alt="img"
                      style={{
                        width: "70px",
                        height: "70px",
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
                        {item?.user?.name}
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
                            width: "15px",
                            height: "15px",
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
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                    <RateMerchantDialog
                      rateDialogOpen={rateDialogOpen}
                      setRateDialogOpen={setRateDialogOpen}
                      product={item}
                    />
                    {loggedUser?.role == "user" ? (
                      <>
                        <Typography
                          onClick={() => setRateDialogOpen(true)}
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#403DA8",
                          }}
                        >
                          <Icon
                            icon="material-symbols:star-rate"
                            width={25}
                            style={{ color: "#585858" }}
                          />
                          تقييم البائع
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#403DA8",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            (window.location.href = `tel:${item?.user?.phone}`)
                          }
                        >
                          <Icon
                            icon="vaadin:chat"
                            width={25}
                            style={{ color: "#585858" }}
                          />
                          مراسلة البائع
                        </Box>
                      </>
                    ) : (
                      <Link to={"/login"}> Login </Link>
                    )}
                  </Box>
                </Box>
              </Box>
              <ReviewMerchant review={item?.user?.reviews} />
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </>
  );
};

export default ProductDetails;
