import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { terminateProductStatus } from "../../redux/actions/productsAction";
import notify from "../useNotifaction";

const TerminateProductStatusHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  const handleTerminateProduct = async (id) => {
    setLoading(true);
    await dispatch(terminateProductStatus(id));
    setLoading(false);
  };

  const Product = useSelector((state) => state.allproducts.terminatedProduct);

  useEffect(()=>{
    if (loading === false) {
        if(Product){
            console.log(Product);
            notify("بدء العد التنازلي لانهاء المزايدة", "success");
            setTimeout(() => {
                window.location.reload(false)
            }, 1500);
        }
    }
  },[loading])

  return [handleTerminateProduct];
};

export default TerminateProductStatusHook;
