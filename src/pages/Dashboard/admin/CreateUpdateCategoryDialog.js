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
import DeleteIcon from "@mui/icons-material/Delete";
import baseUrl from "../../../Api/baseURL";
import notify from "../../../hook/useNotifaction";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const CreateUpdateCategoryDialog = ({
  method,
  createUpdateDialogOpen,
  setCreateUpdateDialogOpen,
  targetCategory,
  setTargetCategory,
  categories,
  setCategories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [errors, setErrors] = useState(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (targetCategory?._id) {
      setFormData((prev) => ({
        name: targetCategory.name,
        image: targetCategory.image,
      }));
    } else {
      setFormData({
        name: "",
        image: null,
      });
    }
  }, [targetCategory]);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      window.scrollTo({ top: "0", behavior: "smooth" });
      setErrors(new Map().set("image", "صوره الغطاء مطلوبه"));
      return false;
    }

    // prepare data
    const data = new FormData();

    data.append("name", formData.name);
    data.append("image", formData.file);

    // send request
    setLoading(true);
    try {
      const token = localStorage.token;
      const response = await baseUrl.post("/api/v1/category", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        notify("تم الانشاء بنجاح", "success");
        setCategories((prev) => [...prev, response.data?.data]);
        setCreateUpdateDialogOpen(false);
        setFormData({
          name: "",
          image: null,
        });
      }
    } catch (err) {
      if (err?.response?.data?.message?.startsWith("E11000")) {
        notify("من فضلك قم بتغير اسم الفئة هناك فئة بنفس الاسم لديك", "error");
      } else {
        notify("خطأ", "error");
      }
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      formData.name == targetCategory.name &&
      !(formData.file instanceof File)
    ) {
      return false;
    }

    const data = new FormData();
    if (formData.name != targetCategory.name) {
      data.append("name", formData.name);
    }
    if (formData.file instanceof File) {
      data.append("image", formData.file);
    }
    setLoading(true);
    // send request
    try {
      const token = localStorage.token;
      const response = await baseUrl.put(
        `/api/v1/category/${targetCategory?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notify("تم التعديل بنجاح", "success");
        setCreateUpdateDialogOpen(false);
        const newCategories = categories.map((cat) => {
          if (cat._id == targetCategory._id) {
            return response?.data?.data;
          } else {
            return cat;
          }
        });
        setCategories(newCategories);
        setFormData({
          name: "",
          image: null,
          file: null,
        });
        setTargetCategory(null);
      }
    } catch (err) {
      if (err?.response?.data?.error?.code == 11000) {
        notify("من فضلك قم بتغير اسم الفئة هناك فئة بنفس الاسم لديك", "error");
      } else {
        notify("خطأ", "error");
      }
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
              {method == "create" ? "انشاء فئة جديدة" : "تعديل الفئة"}{" "}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="اسم الفئة"
                  dir="rtl"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color={"error"}
                variant={"contained"}
                onClick={() => {
                  setCreateUpdateDialogOpen(false);
                  setTargetCategory(null);
                  setFormData({ name: "", image: "", file: null });
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
