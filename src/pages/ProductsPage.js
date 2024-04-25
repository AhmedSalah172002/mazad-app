import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import GetAllProducts from "../hook/products/GetAllProducts";
import ProductCard from "../component/Home/ProductCard";
import Pagination from "../component/utils/Pagination";
import { Zoom } from "react-awesome-reveal";

const ProductsPage = () => {
  const [items, filter, setFilter, onPress, pageCount, results] =
    GetAllProducts();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        paddingX: { xs: "1rem", sm: "2rem" },
        direction: "rtl",
        marginY: "15vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={3} sx={{ marginBottom: "15px" }}>
          <Box
            sx={{
              background: "#D9D9D9",
              width: "100%",
              height: "100vh",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                background: "#403DA8",
                width: "100%",
                padding: "15px",
                color: "white",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              تحديد الخيارات
            </Box>
            <Box sx={{ padding: "15px 20px" }}>
              <Box>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "700",
                  }}
                >
                  السعر
                </Typography>
                <Box sx={{ display: "flex", gap: "20px", marginY: "20px" }}>
                  <label>من</label>
                  <input type="number" style={{ width: "70px" }} />
                  <label>الى</label>
                  <input type="number" style={{ width: "70px" }} />
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "700",
                  }}
                >
                  التصنيفات
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginY: "20px",
                  }}
                >
                  <FormControl component="fieldset">
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="ساعات"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="مجوهرات"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="سيارات"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="عقارات"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="رياضة"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="إلكترونيات"
                      labelPlacement="end"
                    />
                  </FormControl>
                </Box>
                <Box sx={{ margin: "40px auto 15px" }}>
                  <Button
                    sx={{
                      background: "#403DA8",
                      display: "block",
                      margin: "50px auto 10px",
                      width: "250px",
                      padding: "8px 35px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    بحث{" "}
                  </Button>
                  <Button
                    sx={{
                      background: " #ED1313B5",
                      display: "block",
                      margin: "auto",
                      width: "250px",
                      padding: "8px 35px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    الإعدادات الإفتراضية{" "}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          sx={{ marginBottom: "15px", textAlign: "center" }}
        >
          <Box
            sx={{
              background: "#D9D9D9",
              width: "100%",
              padding: "15px 30px",
              minHeight: "150vh",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "23vh",
                padding: "20px 15px",
                borderRadius: "20px",
                background: "white",
                marginY: "25px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: "#2E3D62",
                    fontWeight: "700",
                  }}
                >
                  المزادات
                </Typography>
                <input
                  type="text"
                  style={{
                    background: "#403DA8BA",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "50px",
                    width: "40%",
                  }}
                  placeholder="بحث 🔍"
                />
              </Box>
              <Box
                sx={{
                  margin: "25px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  direction: "ltr",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label="المزادات القادمة (50)"
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label="المزادات المنتهية (10)"
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label="المزادات النشطة (40)"
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label="جميع المزادات (100)"
                  />
                </Tabs>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {items?.length > 0
                ? items.map((item) => (
                    <Zoom>
                      <ProductCard status={item?.status} item={item} />
                    </Zoom>
                  ))
                : <p style={{textAlign:'center',width:'100%',fontSize:'22px'}}>لا يوجد منتجات حتي الأن </p>}
            </Box> 
            {/* <Pagination pageCount={0} onPress={onPress} /> */}

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage;
