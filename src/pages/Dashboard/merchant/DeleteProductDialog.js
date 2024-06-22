import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import baseUrl from "../../../Api/baseURL";
import notify from "../../../hook/useNotifaction";

export const DeleteProductDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  targetProduct,
  setTargetProduct,
  products,
  setProducts,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.token;
      const response = await baseUrl.delete(
        `/api/v1/products/${targetProduct?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        notify("تم حذف المنتج بنجاح", "success");
        setDeleteDialogOpen(false);
        setTargetProduct(null);
        const newProducts = products.filter(
          (prod) => prod._id != targetProduct._id
        );
        setProducts(newProducts);
      }
    } catch (err) {
      notify("حاول فى وقت لاحق", "error");
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={() => {
        setDeleteDialogOpen(false);
        setTargetProduct(null);
      }}
    >
      <DialogTitle>
        {" "}
        <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "23px",
          }}
        >
          {" "}
          حذف المنتج{" "}
        </Typography>{" "}
      </DialogTitle>
      <DialogContent>هل انت متأكد من حذف المنتج</DialogContent>
      <DialogActions>
        <Button
          color={"error"}
          variant={"contained"}
          onClick={() => {
            setDeleteDialogOpen(false);
            setTargetProduct(null);
          }}
          sx={{ ml: 1 }}
        >
          اغلاق
        </Button>
        <Button onClick={handleDelete} variant={"contained"} disabled={loading}>
          {" "}
          {loading ? <CircularProgress /> : "حذف"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
