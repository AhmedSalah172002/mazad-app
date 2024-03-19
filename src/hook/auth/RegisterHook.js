import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/authAction";
import notify from "../../hook/useNotifaction";
import {isEgyptianPhoneNumber, isValidEmail} from '../utils/validation'


const validation = (
  email,
  name,
  phone,
  password,
  passwordConfirm,
  role,
  setErrors
) => {
  const newErrors = new Map();
  if (!email) {
    newErrors.set("email", "البريد الاكترونى مطلوب");
  }
  if (email && !isValidEmail(email)) {
    newErrors.set("email", "ادخل بريد الكترونى صحيح");
  }
  if (!name) {
    newErrors.set("name", "اسم المستخدم مطلوب");
  }
  if (!phone) {
    newErrors.set("phone", "رقم الهاتف مطلوب");
  }
  if (phone && !isEgyptianPhoneNumber(phone)) {
    newErrors.set("phone", "يجب ان يكون رقم مصرى");
  }
  if (!password) {
    newErrors.set("password", "كلمه المرور مطلوبه");
  }
  if (password && password.length < 6) {
    newErrors.set("password", "يجب ان تكون كلمه المرور اكبر من 5 حروف");
  }
  if (!passwordConfirm) {
    newErrors.set("passwordConfirm", "تأكيد كلمه المرور مطلوبه");
  }
  if (password !== passwordConfirm) {
    newErrors.set("passwordConfirm", "يجب ان تكون كلمات المرور متطابقه");
  }
  if (!role) {
    newErrors.set("role", "من فضلك اختر نوع الحساب");
  }

  if (newErrors.size) {
    setErrors(newErrors);
    return false;
  }
  return true;
};

const RegisterHook = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState(new Map());

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const isValidForm = validation(
      email,
      name,
      phone,
      password,
      passwordConfirm,
      role,
      setErrors
    );

    if (!isValidForm) {
      return false;
    }

    // send request to server
    const data = {
      email,
      name,
      phone,
      password,
      passwordConfirm,
      role,
    };

    setLoading(true);
    try {
      await dispatch(register(data));
    } catch (err) {}
    setLoading(false);
  };

  const registerResponse = useSelector((state) => state.authReducer.register);

  useEffect(() => {
    if (registerResponse.status == 201) {
      notify("تم انشاء الحساب بنجاح", "success");
      navigate("/login");
    } else if (
      registerResponse.status === 400 &&
      registerResponse?.data?.errors[0].path === "email"
    ) {
      notify("هذا البريد الالكتورنى مستخدم بالفعل", "error");
    } else {
      notify("حاول مجددا فى وقت لاحق", "error");
    }
  }, [registerResponse]);


  return {
    name,
    email,
    phone,
    password,
    passwordConfirm,
    role,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setPasswordConfirm,
    setRole,
    loading,
    setLoading,
    errors,
    setErrors,
    handleSubmit,
  }


};

export default RegisterHook;
