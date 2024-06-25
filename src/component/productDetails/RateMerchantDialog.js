import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { NozLoadingButton } from "nozolan-library";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import baseUrl from "../../Api/baseURL";
import notify from "../../hook/useNotifaction";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const RateMerchantDialog = ({
  rateDialogOpen,
  setRateDialogOpen,
  product,
}) => {
  const [formData, setFormData] = useState({
    speedOfCommunication: 1,
    delivery: 1,
    credibility: 1,
    respect: 1,
  });
  const [hasOldReview, setHasOldReview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (+value > 5) {
      value = 5;
    }
    if (+value < 0.5) {
      value = 0.5;
    }
    setFormData((prev) => ({ ...prev, [name]: +value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.token;
      const response = await baseUrl.post(
        `api/v1/merchant/${product?.user?._id}/reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        notify("تم انشاء التقييم بنجاح", "success");
        setRateDialogOpen(false);
        setHasOldReview(true);
      }
    } catch (err) {
      if (
        err?.response?.data?.error?.startsWith(
          "You can only review a merchant once."
        )
      ) {
        notify(
          "لا يمكن ترك اكتر من مراجعة لنفس البائع قم بحذف المراجعه القديمة وانشئ مراجعه جديدة",
          "error"
        );
        setHasOldReview(true);
      }
    }
    setLoading(false);
  };

  const handleDeleteOldReview = async () => {
    setLoading(true);
    try {
      const token = localStorage.token;
      const response = await baseUrl.delete(
        `api/v1/merchant/${product?.user?._id}/user/review`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        notify("تم حذف المراحعة القديمة", "success");
        setHasOldReview(false)
      }
    } catch (err) {
      if(err?.response?.data?.error?.startsWith('No doc match this id')){
        setHasOldReview(false)
      }
    }
    setLoading(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Dialog open={rateDialogOpen} onClose={() => setRateDialogOpen(false)}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            تقييم البائع{" "}
          </DialogTitle>
          {hasOldReview ? (
            <DialogContent>
              <NozLoadingButton
                onClick={handleDeleteOldReview}
                loading={loading}
                color={"error"}
              >
                حذف المراحعة القديمة
              </NozLoadingButton>
            </DialogContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ p: 1, mt: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      dir={"rtl"}
                      fullWidth
                      label={"سرعة التواصل"}
                      name="speedOfCommunication"
                      value={formData.speedOfCommunication}
                      onChange={handleChangeInput}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      dir={"rtl"}
                      label={"التوصيل"}
                      fullWidth
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleChangeInput}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      dir={"rtl"}
                      label={"المصداقية"}
                      fullWidth
                      name="credibility"
                      value={formData.credibility}
                      onChange={handleChangeInput}
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      dir={"rtl"}
                      label={"الاحترام"}
                      fullWidth
                      name="respect"
                      value={formData.respect}
                      onChange={handleChangeInput}
                      type={"number"}
                    />
                  </Grid>
                </Grid>
                <NozLoadingButton loading={loading} type={"submit"} sx={{ width: "100%", mt: 2 }}>
                  {" "}
                  تسليم{" "}
                </NozLoadingButton>
              </DialogContent>
            </form>
          )}
        </Dialog>
      </ThemeProvider>
    </CacheProvider>
  );
};
