import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useNavigate } from "react-router-dom";
import uploadImage from "../images/upload.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedUser } from "../redux/actions/loggedUserAction";
import notify from "../hook/useNotifaction";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function canUpdate(userData, formData) {
  if (
    userData.name == formData.name &&
    userData.email == formData.email &&
    userData.phone == formData.phone &&
    userData.image == formData.image
  ) {
    return false;
  }
}

export const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    file: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    file: null,
  });

  const [errors, setErrors] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.user) {
      const user = JSON.parse(localStorage?.user);
      const allowedRoles = ["user", "merchant"];
      if (!allowedRoles.includes(user.role)) {
        navigate("/");
      }
      setUserData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      }));

      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canUpdate(userData, formData) == false) {
      return false;
    }

    const data = {};
    if (formData.image.startsWith("blob")) {
      data.image = formData.file;
    } else if (formData.file == "delete") {
      data.image = "";
    }
    if (userData.name != formData.name) {
      data.name = formData.name;
    }
    if (userData.email != formData.email) {
      data.email = formData.email;
    }
    if (userData.phone != formData.phone) {
      data.phone = formData.phone;
    }

    setLoading(true);
    await dispatch(updateLoggedUser(data));
    setLoading(false);
  };

  const response = useSelector(
    (state) => state.loggedUserReducer.updateLoggedUser
  );

  useEffect(() => {
    if (response && response.status == 200) {
      notify("Update successfully", "success");
      localStorage.setItem("user", JSON.stringify(response.data));
      setUserData(formData);
    } else if (
      response &&
      response?.data &&
      response?.data?.errors[0]?.path == "email"
    ) {
      notify("هذا البريد مستخدم بالفعل", "error");
    }
  }, [response]);

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

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            padding: "15vh 0",
          }}
        >
          <Container>
            <Box component="form" onSubmit={handleSubmit}>
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

              <TextField
                fullWidth
                sx={{ mb: 2 }}
                required
                label="الاسم"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                required
                label="البريد الالكترونى"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                required
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Button
                fullWidth
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "تعديل"
                )}
              </Button>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};
