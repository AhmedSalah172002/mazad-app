import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Icon } from "@iconify/react";
import bele from "../../images/bele.jpg";
import ProductCard from "../Home/ProductCard";

const images = [
  {
    original:
      "https://d25trxery91118.cloudfront.net/202212/9d5886a0-72ee-47f6-a65c-466a931c7e35.jpg",
    thumbnail:
      "https://d25trxery91118.cloudfront.net/202212/9d5886a0-72ee-47f6-a65c-466a931c7e35.jpg",
  },
  {
    original:
      "https://d25trxery91118.cloudfront.net/202212/425dbb46-9d38-4fb2-82b0-b8febc7c0629.jpg",
    thumbnail:
      "https://d25trxery91118.cloudfront.net/202212/425dbb46-9d38-4fb2-82b0-b8febc7c0629.jpg",
  },
  {
    original:
      "https://d25trxery91118.cloudfront.net/202212/8605be69-28aa-448e-86d9-25556e83dfc6.jpg",
    thumbnail:
      "https://d25trxery91118.cloudfront.net/202212/8605be69-28aa-448e-86d9-25556e83dfc6.jpg",
  },
];
const items=[]
const customRenderItem = (item) => {
  return (
    <div className="image-gallery-image">
      <img
        src={item.original}
        alt={item.originalAlt}
        style={{ borderRadius: "15px" }}
      />
    </div>
  );
};



const ProductDetails = () => {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  },[])
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
              items={images}
              showPlayButton={false}
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
                خاتم زمرد الأسد
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
                  01095572350
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
                  لا تفوت هذا العرض , سوف ينتهي بعد{" "}
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
                      00
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
                      00
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
                      00
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
                      00
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
                      مجوهرات
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
                    27 أكتوبر 2025 PM 7:12
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
                    5000 <sub style={{ fontSize: "15px" }}>جنية مصرى</sub>
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
                  <Typography
                    variant="body1"
                    component="body1"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    27 مناقصة
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
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      background: "#403DA8",
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
                    }}
                  >
                    المزايدة الأن
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
                  الخاتم المصنوع من الزمرد الأسود يتميز بأناقته الفريدة وجاذبيته
                  الغامضة. يمكن أن يكون لون الزمرد الأسود متنوعًا، حيث يمكن أن
                  يكون غامقًا جدًا شبه أسود أو يحتوي على درجات مختلفة من اللون
                  الأخضر الداكن. يمكن أن تعزز الأضواء المنعكسة على سطح الزمرد
                  الأسود تألقه وجماله. يتميز الخاتم بتصميم فريد من نوعه يبرز
                  جمال الحجر، سواء كان على شكل قطعة كبيرة تسيطر على الخاتم
                  بأناقتها أو كجزء من تصميم معقد يتضمن تفاصيل متقنة. إن تألق
                  الزمرد الأسود يجعله خيارًا رائعًا للأشخاص الذين يبحثون عن قطعة
                  مجوهرات فريدة تعكس ذوقهم الرفيع وأسلوبهم الخاص.
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
                      src={bele}
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#403DA8",
                      }}
                    >
                      <Icon
                        icon="material-symbols:person"
                        width={25}
                        style={{ color: "#585858" }}
                      />
                      صفحة البائع
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#403DA8",
                      }}
                    >
                      <Icon
                        icon="vaadin:chat"
                        width={25}
                        style={{ color: "#585858" }}
                      />
                      مراسلة البائع
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: "35px",
                  background: "#9747FF2B",
                  padding: "40px 20px",
                  borderRadius: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "5px",
                    marginBottom: "35px",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    تقييم البائع :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    <Icon
                      icon="twemoji:star"
                      width={25}
                      style={{ color: "#585858" }}
                    />
                    3
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    سرعة التوصيل
                  </Typography>
                  <Box
                    sx={{
                      
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    4.9
                  </Box>
                </Box>
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
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    التواصل
                  </Typography>
                  <Box
                    sx={{
                      
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    4.7
                  </Box>
                </Box>
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
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    الخبرة الشاملة
                  </Typography>
                  <Box
                    sx={{
                     
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    4.6
                  </Box>
                </Box>
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
                  <Typography
                    variant="body2"
                    component="body2"
                    sx={{
                      fontWeight: "700",
                    }}
                  >
                    الإلتزام
                  </Typography>
                  <Box
                    sx={{
                     
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#403DA8",
                    }}
                  >
                    4.8
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: 30,
            background: "#9747FF2B",
            padding: "25px 15px",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            {items?.length > 0 ? (
              items.map((item) => <ProductCard status={"E"} item={item} />)
            ) : (
              <p
                style={{ textAlign: "center", width: "100%", fontSize: "22px" }}
              >
                لا يوجد منتجات حتي الأن{" "}
              </p>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
