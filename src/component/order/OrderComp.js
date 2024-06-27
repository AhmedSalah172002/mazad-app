import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

export const OrderComp = ({ order }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        marginBottom: 2,
        backgroundColor: "#f5f5f5",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          src={order?.product?.image}
          alt={order?.product?.name}
          sx={{ width: 60, height: 60, marginLeft: 2 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{order?.product?.name}</Typography>
          <Typography variant="subtitle1">
            {order?.product?.category?.name}
          </Typography>
          <Divider sx={{ margin: "8px 0" }} />
          <Grid container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: "bold" }}>المشترى</Typography>
                <ListItemText
                  primary={order?.user?.name}
                  secondary={`البريد الإلكتروني: ${order?.user?.email} | الهاتف: ${order?.user?.phone}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: "bold" }}>البائع</Typography>
                <ListItemText
                  primary={order?.product?.user?.name}
                  secondary={`البريد الإلكتروني: ${order?.product?.user?.email} | الهاتف: ${order?.product?.user?.phone}`}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Icon icon={"emojione:money-bag"} sx={{ marginLeft: 1 }} />
                <Typography variant="body1">
                  {order?.totalOrderPrice?.toLocaleString()} جنيه
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Icon icon={"uil:calender"} sx={{ marginLeft: 1 }} />
                <Typography variant="body1">
                  {new Date(order?.paidAt)?.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
