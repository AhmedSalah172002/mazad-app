import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToMazad } from "../../redux/actions/productsAction";

const AddMazadHook = (id) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const onSubmit = async (price) => {
    setLoading(true);
    await dispatch(
      addToMazad(id, {
        price,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.allproducts.addMazad);

  return [onSubmit];
};

export default AddMazadHook;
