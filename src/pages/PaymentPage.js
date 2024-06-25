import React from "react";
import Payment from "../component/User/Payment";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const {cartId} = useParams()
  return (
    <>
      <Payment cartId={cartId} />
    </>
  );
};

export default PaymentPage;
