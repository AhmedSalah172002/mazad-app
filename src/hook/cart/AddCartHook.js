import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/actions/cartAction";
import notify from "../useNotifaction";
import { useNavigate } from "react-router-dom";

const AddCartHook = (productId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addToCartHandel = async (userId) => {
    setLoading(true);
    await dispatch(
      addProductToCart({
        productId,
        userId,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.cartReducer.addToCart);
  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 201) {
        notify(
          "لقد تم الانتهاء من المزاد. من فضلك راجع بريدك الالكتروني",
          "success"
        );

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        notify("حدث خطأ اثناء عملية انتهاء المزاد", "warn");
      }
    }
  }, [loading]);

  return [addToCartHandel];
};

export default AddCartHook;
