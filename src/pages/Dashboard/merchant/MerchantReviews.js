import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../../Api/baseURL";
import { Typography, Paper, Box, Divider, Grid, Avatar } from "@mui/material";
import { Rating } from "@mui/material";

export const MerchantReviews = () => {
  const { merchantId } = useParams();
  const token = localStorage?.token;
  const [reviews, setReviews] = useState([]);
  const [averageReviews, setAverageReviews] = useState({});
  const [merchant, setMerchant] = useState({});

  useEffect(() => {
    baseUrl
      .get(`/api/v1/admin/merchant/${merchantId}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response?.data?.reviews);
        setAverageReviews(response?.data?.averageReviews);
        setMerchant(response?.data?.merchant);
      });
  }, [merchantId, token]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Merchant Reviews
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Merchant
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={merchant?.image}
              alt={merchant?.name?.charAt(0).toUpperCase()}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{merchant?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {merchant?.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Average Reviews
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <Typography>Rating: {averageReviews.rating}</Typography>
            <Rating
              value={Number(averageReviews.rating)}
              readOnly
              precision={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography>Delivery: {averageReviews.delivery}</Typography>
            <Rating
              value={Number(averageReviews.delivery)}
              readOnly
              precision={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography>Credibility: {averageReviews.credibility}</Typography>
            <Rating
              value={Number(averageReviews.credibility)}
              readOnly
              precision={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography>Respect: {averageReviews.respect}</Typography>
            <Rating
              value={Number(averageReviews.respect)}
              readOnly
              precision={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography>
              Speed of Communication: {averageReviews.speedOfCommunication}
            </Typography>
            <Rating
              value={Number(averageReviews.speedOfCommunication)}
              readOnly
              precision={0.1}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Individual Reviews
        </Typography>
        <Grid container>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4}>
              <Box key={review._id} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar
                      src={review?.user?.image}
                      alt={review?.user?.name[0]?.toUpperCase()}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">{review.user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {review.user.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography>Rating: {review.rating}</Typography>
                <Rating value={review.rating} readOnly precision={0.1} />
                <Typography>
                  Speed of Communication: {review.speedOfCommunication}
                </Typography>
                <Rating
                  value={review.speedOfCommunication}
                  readOnly
                  precision={0.1}
                />
                <Typography>Delivery: {review.delivery}</Typography>
                <Rating value={review.delivery} readOnly precision={0.1} />
                <Typography>Credibility: {review.credibility}</Typography>
                <Rating value={review.credibility} readOnly precision={0.1} />
                <Typography>Respect: {review.respect}</Typography>
                <Rating value={review.respect} readOnly precision={0.1} />
                <Divider sx={{ mt: 2, mb: 2 }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};
