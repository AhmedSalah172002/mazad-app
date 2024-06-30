import React, { useState, useEffect } from "react";
import notify from "./../useNotifaction";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";

const validation = (email, password, setErrors) => {
  const newErrors = new Map();
  if (!email) {
    newErrors.set("email", "البريد الالكترونى مطلوب");
  }

  if (!password) {
    newErrors.set("password", "كلمة المرور مطلوبة");
  }

  if (password && password.length < 6) {
    newErrors.set("password", "يجب أن تكون كلمة المرور علي الأقل 6 اخرف");
  }

  if (newErrors.size) {
    setErrors(newErrors);
    return false;
  }
  return true;
};

const LoginHook = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(new Map());

  const onChangeEmail = (e) => {
    errors.has("email") && errors.delete("email");
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    errors.has("password") && errors.delete("password");
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validation(email, password, setErrors)) return false;
    setLoading(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.authReducer.loginUser);
  console.log(res);
  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          notify("تم تسجيل الدخول بنجاح", "success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        if (res?.data?.message) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify(res.data.message, "error");
        }
        if (
          res?.data?.errors &&
          res?.data?.errors?.length &&
          res?.data?.errors[0]?.msg == "عنوان بريد غير صالح"
        ) {
          setErrors(new Map().set("email", "عنوان بريد غير صالح"));
        }
        setLoading(true);
      }
    }
  }, [loading]);

  return {
    email,
    password,
    loading,
    errors,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  };
};

export default LoginHook;
