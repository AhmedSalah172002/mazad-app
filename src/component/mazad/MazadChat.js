import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetProductDetails from "../../hook/products/GetProductDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Chatting from "./Chatting";
import AddCartHook from "../../hook/cart/AddCartHook";
import { Box, Button, Grid, Typography } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { Icon } from "@iconify/react";
import bele from "../../images/bele.jpg";
import ProductCard from "../Home/ProductCard";
import { NozProgress } from "nozolan-library";

import {
  convertTimeTo12Hours,
  convertToArabicDate,
} from "../utils/convertUTCToLocalTime";

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

const MazadChat = () => {
  let { productId } = useParams();
  const [addToCartHandel] = AddCartHook(productId);
  const [item] = GetProductDetails(productId);
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

              <Grid sx={{ marginY: "15px" }}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: "700",
                    marginBottom: "25px",
                  }}
                >
                  شروط المناقصة :
                </Typography>
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
                      القيمة الإبتدائية للمزاد :
                    </Typography>
                    <Typography
                      variant="body21"
                      component="body1"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      {item?.initialPrice}
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
                      أقل قيمة للمناقصة :
                    </Typography>
                    <Typography
                      variant="body21"
                      component="body1"
                      sx={{
                        fontSize: "18px",
                        marginBottom: "35px",
                      }}
                    >
                      {item?.lowestBidValue}
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
            </Box>
          </Grid>
        </Grid>
        <Chatting item={item} />
      </Box>
    </>
  );
};

export default MazadChat;
