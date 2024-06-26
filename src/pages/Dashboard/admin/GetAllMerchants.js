import React, { useEffect, useState } from "react";
import baseUrl from "../../../Api/baseURL";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const GetAllMerchants = () => {
  const [merchants, setMerchants] = useState([]);
  const token = localStorage?.token;
  const navigate = useNavigate();

  useEffect(() => {
    baseUrl
      .get("/api/v1/users/admin/merchants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setMerchants(response?.data));
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {merchants.map((merchant) => (
          <Tooltip title="Show merchant rating">
            <Grid
              onClick={() => {
                navigate(`/dashboard/admin/merchant/${merchant._id}/reviews`);
              }}
              sx={{ cursor: "pointer" }}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={merchant._id}
            >
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {merchant.image && (
                  <CardMedia
                    component="img"
                    alt={merchant.name}
                    image={merchant.image}
                    sx={{ height: "200px" }}
                  />
                )}
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {merchant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {merchant.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {merchant.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Tooltip>
        ))}
      </Grid>
    </div>
  );
};
