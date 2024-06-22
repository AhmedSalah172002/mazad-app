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

export const DeleteCategoryDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  targetCategory,
  setTargetCategory,
  categories,
  setCategories,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.token;
      const response = await baseUrl.delete(
        `/api/v1/category/${targetCategory?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        notify("تم الحذف بنجاح", "success");
        setDeleteDialogOpen(false);
        setTargetCategory(null);
        const newCategories = categories.filter(
          (cat) => cat._id != targetCategory._id
        );
        setCategories(newCategories);
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
        setTargetCategory(null);
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
          حذف الفئة{" "}
        </Typography>{" "}
      </DialogTitle>
      <DialogContent>هل انت متأكد من حذف الفئة</DialogContent>
      <DialogActions>
        <Button
          color={"error"}
          variant={"contained"}
          onClick={() => {
            setDeleteDialogOpen(false);
            setTargetCategory(null);
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
