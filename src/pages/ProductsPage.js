import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GetAllProducts from "../hook/products/GetAllProducts";
import ProductCard from "../component/Home/ProductCard";
import Pagination from "../component/utils/Pagination";
import { Zoom } from "react-awesome-reveal";
import GetCategoryHook from "../hook/category/GetCategoryHook";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const ProductsPage = () => {
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [search, setSearch] = useState("");

  const [items, filter, setFilter, onPress, pageCount, results] =
    GetAllProducts(6, categoryFilter, search, priceFilter);
  const [res] = GetCategoryHook();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 3) {
      setFilter("");
    } else if (newValue === 2) {
      setFilter("status=start-now&");
    } else if (newValue === 1) {
      setFilter("status=finished&");
    } else if (newValue === 0) {
      setFilter("status=not-started&");
    }
  };

  const [checkedValues, setCheckedValues] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedValues((prevValues) => {
      if (checked) {
        return {
          ...prevValues,
          [value]: true,
        };
      } else {
        const { [value]: removedItem, ...rest } = prevValues;
        return rest;
      }
    });
  };

  const handleCategory = () => {
    if (maxPrice)
      setPriceFilter(
        `initialPrice[gte]=${minPrice}&initialPrice[lte]=${maxPrice}`
      );
    else setPriceFilter(`initialPrice[gte]=${minPrice||0}`);
    setCategoryFilter(Object.keys(checkedValues).join("&"));
  };
  const resetChecked = () => {
    setCheckedValues({});
    setCategoryFilter("");
    setPriceFilter("");
    setMaxPrice("");
    setMinPrice("");
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
              minHeight: "80vh",
              maxHeight: "fit-content",
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
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        id="outlined-basic"
                        variant="outlined"
                        label="من"
                      />
                      <TextField
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        id="outlined-basic"
                        variant="outlined"
                        label="الى"
                      />
                    </ThemeProvider>
                  </CacheProvider>
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
                    {res?.data?.map((cat) => (
                      <FormControlLabel
                        value={`category=${cat?._id}`}
                        control={<Checkbox />}
                        label={cat?.name}
                        labelPlacement="end"
                        onChange={handleCheckboxChange}
                        checked={checkedValues[`category=${cat?._id}`] || false}
                      />
                    ))}
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
                      ":hover": {
                        background: "#403DA8",
                      },
                    }}
                    onClick={handleCategory}
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
                      ":hover": {
                        background: " #ED1313B5",
                      },
                    }}
                    onClick={resetChecked}
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
                  المزادات ({results})
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                    label={`المزادات القادمة `}
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label={`المزادات المنتهية `}
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label={`المزادات النشطة `}
                  />
                  <Tab
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                    label={`جميع المزادات`}
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
              {items?.length > 0 ? (
                items.map((item) => (
                  <Zoom>
                    <ProductCard status={item?.status} item={item} />
                  </Zoom>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontSize: "22px",
                  }}
                >
                  لا يوجد منتجات حتي الأن{" "}
                </p>
              )}
            </Box>
            {pageCount > 1 && (
              <Pagination pageCount={pageCount} onPress={onPress} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage;
