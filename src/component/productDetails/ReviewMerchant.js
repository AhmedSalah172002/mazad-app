import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Typography } from "@mui/material";
import React from "react";

export const ReviewMerchant = ({ review }) => {
  return (
    <Box
      sx={{
        marginTop: "35px",
        background: "#9747FF2B",
        padding: "40px 20px",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
          marginBottom: "35px",
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontWeight: "700",
          }}
        >
          تقييم البائع :
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "18px",
            fontWeight: "700",
            color: "#403DA8",
          }}
        >
          <Icon icon="twemoji:star" width={25} style={{ color: "#585858" }} />
          {review?.rating}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <Typography
          variant="body2"
          component="body2"
          sx={{
            fontWeight: "700",
          }}
        >
          سرعة التواصل
        </Typography>
        <Box
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#403DA8",
          }}
        >
          {review?.speedOfCommunication}
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <Typography
          variant="body2"
          component="body2"
          sx={{
            fontWeight: "700",
          }}
        >
          التوصيل
        </Typography>
        <Box
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#403DA8",
          }}
        >
          {review?.delivery}
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <Typography
          variant="body2"
          component="body2"
          sx={{
            fontWeight: "700",
          }}
        >
          المصداقية
        </Typography>
        <Box
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#403DA8",
          }}
        >
          {review?.credibility}
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <Typography
          variant="body2"
          component="body2"
          sx={{
            fontWeight: "700",
          }}
        >
          الاحترام
        </Typography>
        <Box
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#403DA8",
          }}
        >
          {review?.respect}{" "}
        </Box>
      </Box>
    </Box>
  );
};
