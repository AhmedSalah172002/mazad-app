import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Link, useNavigate } from "react-router-dom";
import uploadImage from "../images/assets/images/avatars/avatar_25.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedUser } from "../redux/actions/loggedUserAction";
import notify from "../hook/useNotifaction";
import mazadyGif from "../images/Mazady.gif";
import CameraIcon from "../component/utils/CameraIcon";

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

export const UpdateProfile = ({ forEdit = false }) => {
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
            padding: "5vh 0",
          }}
        >
          <Container>
            <img
              src={mazadyGif}
              style={{
                width: "100%",
                borderRadius: "8px",
                height: "350px",
                objectFit: "cover",
              }}
              alt="cover"
              className="mb-4"
            />
            {/* {forEdit && (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid
                  sx={{ display: "flex", alignItems: "center" }}
                  container
                  spacing={2}
                >
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        padding: "15px",
                        my: 2,
                        position: "relative",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="active-profile">نشط الأن</div>
                      <label
                        htmlFor="inputImg"
                        className="update-img-label"
                        style={{ position: "relative", my: 4 }}
                      >
                        <img
                          className="update-img"
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "contain",
                            cursor: "pointer",
                            borderRadius: "50%",
                          }}
                          src={formData.image ? formData.image : uploadImage}
                          alt="user"
                        />

                        <div className="camera-img">
                          <CameraIcon />
                          <span>Update photo</span>
                        </div>
                      </label>

                      <input
                        onChange={handleChangeImage}
                        id={"inputImg"}
                        type="file"
                        hidden
                      />

                      {formData.image && formData.image != uploadImage ? (
                        <button
                          className="delete-profile-img"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              image: uploadImage,
                              file: "delete",
                            }));
                          }}
                        >
                          حذف الصورة
                        </button>
                      ) : null}
                      <Typography
                        sx={{ fontSize: "16px", color: "red", my: 1 }}
                      >
                        {errors.has("image") && errors.get("image")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      dir="rtl"
                      fullWidth
                      sx={{ mb: 2 }}
                      required
                      label="الاسم"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <TextField
                      dir="rtl"
                      fullWidth
                      sx={{ mb: 2 }}
                      required
                      label="البريد الالكترونى"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <TextField
                      dir="rtl"
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
                      sx={{ mb: 2, background: "#1C252E", borderRadius: "8px" }}
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
                  </Grid>
                </Grid>
              </Box>
            )} */}

            <div className="rounded bg-slate-50 shadow flex items-center justify-center flex-column gap-3 p-5 relative">
              <div className="active-profile">نشط الأن</div>
              {forEdit && (
                <>
                  <Link
                    to={"/dashboard/profile"}
                    className="absolute left-[20px] top-[20px]"
                  >
                    رجوع
                  </Link>
                  <Box component="form" onSubmit={handleSubmit}>
                    <div
                      className="flex flex-column items-center justify-center gap-3"
                      container
                      spacing={2}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={6}>
                        <label
                          htmlFor="inputImg"
                          className="update-img-label relative"
                        >
                          <img
                            className="update-img"
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "contain",
                              cursor: "pointer",
                              borderRadius: "50%",
                            }}
                            src={formData.image ? formData.image : uploadImage}
                            alt="user"
                          />

                          <div className="camera-img">
                            <CameraIcon />
                            <span>Update photo</span>
                          </div>
                        </label>

                        <input
                          onChange={handleChangeImage}
                          id={"inputImg"}
                          type="file"
                          hidden
                        />

                        {formData.image && formData.image != uploadImage ? (
                          <button
                            className="delete-profile-img"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                image: uploadImage,
                                file: "delete",
                              }));
                            }}
                          >
                            حذف الصورة
                          </button>
                        ) : null}
                        <Typography
                          sx={{ fontSize: "16px", color: "red", my: 1 }}
                        >
                          {errors.has("image") && errors.get("image")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6}>
                        <TextField
                          dir="rtl"
                          fullWidth
                          sx={{ mb: 2 }}
                          required
                          label="الاسم"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <TextField
                          dir="rtl"
                          fullWidth
                          sx={{ mb: 2 }}
                          required
                          label="البريد الالكترونى"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <TextField
                          dir="rtl"
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
                          sx={{
                            mb: 2,
                            background: "#1C252E",
                            borderRadius: "8px",
                          }}
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
                      </Grid>
                    </div>
                  </Box>
                </>
              )}
              {!forEdit && (
                <>
                  <Link to={"edit"} className="absolute left-[20px] top-[20px]">
                    تعديل
                  </Link>
                  <img
                    src={formData.image ? formData.image : uploadImage}
                    alt="userPic"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <p className="mb-0 font-bold">{formData.name}</p>
                  <p className="mb-0">{formData.email}</p>
                  <p className="mb-0">{formData.phone}</p>
                </>
              )}
            </div>
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};
