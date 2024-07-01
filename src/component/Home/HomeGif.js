import React from "react";
import gif from "../../images/home.gif";
import { Box } from "@mui/material";
const HomeGif = () => {
  return (
    <Box
      sx={{
        paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
        marginY: "15vh",
      }}
    >
      <img
        src={gif}
        style={{
          width: "100%",
          borderRadius: "8px",
        }}
        alt="cover"
      />
    </Box>
  );
};

export default HomeGif;
