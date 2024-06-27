import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import uploadImage from "../../../images/upload.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import baseUrl from "../../../Api/baseURL";
import notify from "../../../hook/useNotifaction";

const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

function canUpdate(formData, product) {
  if (
    formData?.name != product?.name ||
    formData?.description != product?.description ||
    formData?.initialPrice != product?.initialPrice ||
    formData?.lowestBidValue != product?.lowestBidValue ||
    formData?.category != product?.category._id ||
    formData?.date != product?.date?.split("T")[0] ||
    formData?.startTime != product?.startTime ||
    formData?.endTime != product?.endTime ||
    formData?.file instanceof File ||
    (formData?.images &&
      formData?.images?.length &&
      formData?.images[0] instanceof File)
  ) {
    return true;
  }
  return false;
}

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const CreateUpdateProductDialog = ({
  method,
  createUpdateDialogOpen,
  setCreateUpdateDialogOpen,
  targetProduct,
  setTargetProduct,
  products,
  setProducts,
}) => {
  const token = localStorage?.token

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    initialPrice: "",
    lowestBidValue: "",
    category: "",
    image: null,
    images: [],
    date: "",
    startTime: "",
    endTime: "",
  });

  const [errors, setErrors] = useState(new Map());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (targetProduct?._id) {
      setFormData((prev) => ({
        name: targetProduct.name,
        description: targetProduct.description,
        initialPrice: targetProduct.initialPrice,
        lowestBidValue: targetProduct.lowestBidValue,
        category: targetProduct.category?._id,
        date: targetProduct.date?.split("T")[0],
        startTime: targetProduct.startTime,
        endTime: targetProduct.endTime,
        image: targetProduct.image,
        images: targetProduct.images,
      }));
    } else {
      setFormData({
        name: "",
        description: "",
        initialPrice: "",
        lowestBidValue: "",
        category: "",
        image: null,
        images: [],
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  }, [targetProduct]);

  useEffect(() => {
    baseUrl
      .get("/api/v1/category", {headers: {Authorization: `Bearer ${token}`}})
      .then((response) => setCategories(response.data?.data));
  }, []);

  const handleChangeImage = (e) => {
    errors.has("image") && errors.delete("image");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image")) {
        setErrors(new Map(errors).set("image", "Invalid image"));
        return;
      }
      if (file.size > 1000 * 5000) {
        setErrors(
          new Map(errors).set("image", "Only accept image size less than 5MB")
        );
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        file,
      }));
    }
    e.target.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index),
    }));
  };

  const onDrop = (acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      images: [...acceptedFiles],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      window.scrollTo({ top: "0", behavior: "smooth" });
      setErrors(new Map().set("image", "صوره الغطاء مطلوبه"));
      return false;
    }
    if (!formData.images.length) {
      window.scrollTo({ top: "0", behavior: "smooth" });
      setErrors(
        new Map().set("image", "من فضلك حدد على الاقل صوره من الصور المتعدده")
      );
      return false;
    }
    if (
      formData?.images?.length &&
      formData?.images[0] instanceof File &&
      formData?.images?.length > 3
    ) {
      window.scrollTo({ top: "0", behavior: "smooth" });
      setErrors(
        new Map().set("image", "يمكنك رفع 3 صور بحد اقصى من الصور المتعددة")
      );
      return false;
    }

    // prepare data
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("initialPrice", formData.initialPrice);
    data.append("lowestBidValue", formData.lowestBidValue);
    data.append("category", formData.category);
    data.append("date", formData.date);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("image", formData.file);
    for (const item of formData.images) {
      data.append("images", item);
    }
    // send request
    setLoading(true);
    try {
      const response = await baseUrl.post("/api/v1/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        notify("تم الانشاء بنجاح", "success");
        const prod = {
          ...response.data.data,
          category: {
            _id: response.data.data.category,
          },
        };
        setProducts((prev) => [...prev, prod]);
        setCreateUpdateDialogOpen(false);
        setFormData({
          name: "",
          description: "",
          initialPrice: "",
          lowestBidValue: "",
          category: "",
          image: null,
          images: [],
          date: "",
          startTime: "",
          endTime: "",
        });
      }
    } catch (err) {
      if (err?.response?.data?.message?.startsWith("E11000")) {
        notify(
          "من فضلك قم بتغير اسم المنتج هناك منتج بنفس الاسم لديك",
          "error"
        );
      } else {
        notify("خطأ", "error");
      }
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      formData?.images?.length &&
      formData?.images[0] instanceof File &&
      formData?.images?.length > 3
    ) {
      window.scrollTo({ top: "0", behavior: "smooth" });
      setErrors(
        new Map().set("image", "يمكنك رفع 3 صور بحد اقصى من الصور المتعددة")
      );
      return false;
    }

    if (!canUpdate(formData, targetProduct)) {
      return false;
    }

    const data = new FormData();
    if (formData.name != targetProduct.name) {
      data.append("name", formData.name);
    }
    if (formData.description != targetProduct.description) {
      data.append("description", formData.description);
    }
    if (formData.initialPrice != targetProduct.initialPrice) {
      data.append("initialPrice", formData.initialPrice);
    }
    if (formData.lowestBidValue != targetProduct.lowestBidValue) {
      data.append("lowestBidValue", formData.lowestBidValue);
    }
    if (formData.category != targetProduct.category) {
      data.append("category", formData.category);
    }
    if (formData.date != targetProduct.date) {
      data.append("date", formData.date);
    }
    if (formData.startTime != targetProduct.startTime) {
      data.append("startTime", formData.startTime);
    }
    if (formData.endTime != targetProduct.endTime) {
      data.append("endTime", formData.endTime);
    }
    if (formData.file instanceof File) {
      data.append("image", formData.file);
    }
    if (formData?.images?.length && formData?.images[0] instanceof File) {
      for (const item of formData.images) {
        data.append("images", item);
      }
    }
    setLoading(true);
    // send request
    try {
      const response = await baseUrl.put(
        `/api/v1/products/${targetProduct?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notify("تم التعديل بنجاح", "success");
        setCreateUpdateDialogOpen(false);
        setFormData({
          name: "",
          description: "",
          initialPrice: "",
          lowestBidValue: "",
          category: "",
          image: null,
          images: [],
          date: "",
          startTime: "",
          endTime: "",
        });
        const newProducts = products.map((product) => {
          if (product._id == targetProduct._id) {
            return response.data?.data;
          } else {
            return product;
          }
        });
        setProducts(newProducts);
        setTargetProduct(null);
      }
    } catch (err) {
      console.log(err);
      notify("خطأ", "error");
    }
    setLoading(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Dialog open={createUpdateDialogOpen} fullWidth>
          <DialogTitle>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontWeight: "bold",
                fontSize: "23px",
              }}
            >
              {method == "create" ? "انشاء منتج" : "تعديل المنتج"}{" "}
            </Typography>
          </DialogTitle>
          <form onSubmit={method == "create" ? handleCreate : handleUpdate}>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label htmlFor="inputImg">
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "contain",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                    src={formData.image ? formData.image : uploadImage}
                    alt="user image"
                  />
                </label>
                <input
                  onChange={handleChangeImage}
                  id={"inputImg"}
                  type="file"
                  hidden
                />

                {formData.image && formData.image != uploadImage ? (
                  <Button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        image: uploadImage,
                        file: "delete",
                      }));
                    }}
                    variant="contained"
                    color={"error"}
                    sx={{ mt: 2 }}
                  >
                    delete
                  </Button>
                ) : null}
                <Typography sx={{ fontSize: "16px", color: "red", my: 1 }}>
                  {errors.has("image") && errors.get("image")}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px dashed gray",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>اسحب وأسقط الصور هنا، أو انقر لاختيار الملفات</p>
                    <Button variant="contained" component="span">
                      تحميل صور متعددة
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {formData?.images?.length &&
                    formData?.images[0] instanceof File
                      ? formData?.images?.map((file, index) => (
                          <Grid item key={index}>
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                width={100}
                                height={100}
                                style={{ objectFit: "cover" }}
                              />
                              <IconButton
                                size="small"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                                onClick={() => handleRemoveImage(index)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </Grid>
                        ))
                      : formData?.images?.length
                      ? formData?.images?.map((image, index) => (
                          <Grid item key={index}>
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={image}
                                alt={`preview ${index}`}
                                width={100}
                                height={100}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="اسم المنتج"
                    dir="rtl"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="الوصف"
                    dir="rtl"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type={"number"}
                    label="أدنى قيمة للمزايدة"
                    dir="rtl"
                    name="lowestBidValue"
                    value={formData.lowestBidValue}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    type={"number"}
                    label="السعر الابتدائي"
                    dir="rtl"
                    name="initialPrice"
                    value={formData.initialPrice}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">الفئة</InputLabel>
                    <Select
                      required
                      dir="rtl"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.category}
                      label="الفئة"
                      name={"category"}
                      onChange={handleInputChange}
                    >
                      {categories?.map((cat) => (
                        <MenuItem value={cat._id}> {cat.name} </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="التاريخ"
                    dir="rtl"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: getTodayDate() }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="وقت البدء"
                    dir="rtl"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="وقت الانتهاء"
                    dir="rtl"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color={"error"}
                variant={"contained"}
                onClick={() => {
                  setCreateUpdateDialogOpen(false);
                  setTargetProduct(null);
                }}
                sx={{ ml: 1 }}
              >
                اغلاق
              </Button>
              <Button type={"submit"} variant={"contained"} disabled={loading}>
                {" "}
                {loading ? (
                  <CircularProgress />
                ) : method == "create" ? (
                  "انشاء"
                ) : (
                  "تعديل"
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </ThemeProvider>
    </CacheProvider>
  );
};
