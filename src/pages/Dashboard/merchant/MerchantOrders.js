import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import baseUrl from "../../../Api/baseURL";
import { OrderComp } from "../../../component/order/OrderComp";

export const MerchantOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage?.token;
  useEffect(() => {
    baseUrl
      .get("/api/v1/merchant/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setOrders(response?.data));
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {orders?.map((order) => (
        <Grid item xs={12} key={order._id}>
          <OrderComp order={order} />
        </Grid>
      ))}
    </Grid>
  );
};
