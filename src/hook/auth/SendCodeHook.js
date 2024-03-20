import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../../redux/actions/authAction";
import notify from "../useNotifaction";

const SendCodeHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeCode = (e) => {
    setResetCode(e.target.value);
  };
  const onSubmit = async () => {
    setLoading(true);
    await dispatch(
      sendCode({
        resetCode,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.authReducer.send_code);
  useEffect(() => {
    if (res.status === 201) {
      notify("تم ادخال الكود بنجاح", "success");
      navigate("/new-password");
    } else if(res.status) {
      notify("الكود خاطئ او انتهت المدة", "error");
    }
  }, [res]);

  return [resetCode, loading, onChangeCode, onSubmit];
};

export default SendCodeHook;
