import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onBoarding } from "../redux/actions/onBoardingAction";
import notify from "./useNotifaction";

const OnBoardingHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const onBoardingMerchant = async() => {
    setLoading(true);
    await dispatch(onBoarding());
    setLoading(false);
  };
  const res = useSelector((state) => state.onBoardingReducer.onBoarding);
  useEffect(() => {
    if (loading === false) {
      if (res && res.url) {
        window.location.href = res.url;
      } else {
        notify("حدث خطأ  من فضلك حاول مرة أخرى", "error");
      }
    }
  }, [loading]);

  return [onBoardingMerchant];
};

export default OnBoardingHook;
