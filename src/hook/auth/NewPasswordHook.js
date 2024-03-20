import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import { updatenewPassword } from "../../redux/actions/authAction";

const validation = (password, passwordConfirm, setErrors) => {
  const newErrors = new Map();

  if (!password) {
    newErrors.set("password", "كلمه المرور مطلوبه");
  }
  if (password && password.length < 6) {
    newErrors.set("password", "يجب ان تكون كلمه المرور اكبر من 5 حروف");
  }
  if (!passwordConfirm) {
    newErrors.set("passwordConfirm", "تأكيد كلمه المرور مطلوبه");
  }
  if (password && passwordConfirm && password !== passwordConfirm) {
    newErrors.set("passwordConfirm", "يجب ان تكون كلمات المرور متطابقه");
  }

  if (newErrors.size) {
    setErrors(newErrors);
    return false;
  }
  return true;
};
const NewPasswordHook = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const onChangePassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmit = async () => {
    const isValidForm = validation(newPassword, passwordConfirm, setErrors);

    if (!isValidForm && window.localStorage.getItem("email-forget-password") !== null) {
      return false;
    }
    setLoading(true);
    await dispatch(
        updatenewPassword({
        email: window.localStorage.getItem("email-forget-password"),
        newPassword,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.authReducer.new_password);

  useEffect(() => {
    if (res.status === 200) {
      window.localStorage.removeItem("email-forget-password");
      notify("تم تغيير كلمة المرور بنجاح", "success");
      setTimeout(() => {
        window.location.href="/login";
      }, 1500);
    } else if (res.status === 400) {
      notify("انتهت صلاحية الكود الخاص بك", "error");
    } else if (res.status) {
      notify("حاول مجددا فى وقت لاحق", "error");
    }
  }, [res]);

  return [
    newPassword,
    passwordConfirm,
    errors,
    loading,
    setErrors,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  ];
};

export default NewPasswordHook;
