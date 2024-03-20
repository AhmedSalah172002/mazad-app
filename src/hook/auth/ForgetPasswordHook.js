import React, { useEffect, useState } from "react";
import { isValidEmail } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/actions/authAction";
import notify from "../useNotifaction";

const validation = (email, setErrors) => {
  const newErrors = new Map();
  if (!email) {
    newErrors.set("email", "البريد الاكترونى مطلوب");
  }
  if (email && !isValidEmail(email)) {
    newErrors.set("email", "ادخل بريد الكترونى صحيح");
  }

  if (newErrors.size) {
    setErrors(newErrors);
    return false;
  }
  return true;
};

const ForgetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(new Map());

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    const isValidForm = validation(email, setErrors);

    if (!isValidForm) {
      return false;
    }
    setLoading(true);
    await dispatch(
      forgetPassword({
        email,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.authReducer.forget_password);

  useEffect(() => {
    if (res.status === 201) {
      window.localStorage.setItem("email-forget-password", email);
      navigate("/email-authentication-code");
      notify("تم ارسال الكود بنجاح", "success");
    } else if (res.status === 404) {
      notify(res?.data?.message, "error");
    } else if (res.status) {
      notify("حاول مجددا فى وقت لاحق", "error");
    }
  }, [res]);

  return [email, loading, errors, onChangeEmail, setErrors, onSubmit];
};

export default ForgetPasswordHook;
