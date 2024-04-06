import React from "react";
import logo from "../../images/mazady-logo-white.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import linkedIn from "../../images/linkedin.png";
import instagram from "../../images/instagram.png";
import phone from "../../images/phone-call.png";
import grandPhone from "../../images/grand-phone.jpg";
import email from "../../images/email.png";
import { Avatar, Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Footer() {
  const categories = ["سيارات", "ساعات", "عقارات", "رياضه", "مجوهرات"];

  const pages = [
    {
      title: "الرئيسيه",
      link: "/",
    },
    {
      title: "صفحتى",
      link: "/",
    },
    {
      title: "المزاد",
      link: "/",
    },
  ];

  const helps = [
    {
      title: "حسابك الشخصي",
      link: "/",
    },
    {
      title: "الامان والحمايه",
      link: "/",
    },
    {
      title: "الشروط والاحكام",
      link: "/",
    },
    {
      title: "اتصل بنا",
      link: "/",
    },
    {
      title: "التعليمات",
      link: "/",
    },
  ];

  const followUs = [
    {
      content: "01231233123",
      icon: (
        <Icon icon="ph:phone-bold" width={25} style={{ color: "#9747FF" }} />
      ),
    },
    {
      content: "04286526",
      icon: (
        <Icon icon="carbon:phone-ip" width={25} style={{ color: "#9747FF" }} />
      ),
    },
    {
      content: "support.mazady@gmail.com",
      icon: (
        <Icon icon="ic:outline-email" width={25} style={{ color: "#9747FF" }} />
      ),
    },
    {
      content: "Egypt - Cairo",
      icon: (
        <Icon icon="mingcute:telegram-line" width={25} style={{ color: "#9747FF" }} />
      ),
    },
  ];

  const links = [
    {
      link: "http://facebook.com",
      icon: <Icon icon="logos:facebook" width={30} />,
    },
    {
      link: "http://twitter.com",
      icon: <Icon icon="ri:twitter-x-fill" width={30} />,
    },
    {
      link: "http://linkedIn.com",
      icon: <Icon icon="entypo-social:linkedin-with-circle" width={30} />,
    },
    {
      link: "http://instagram.com",
      icon: <Icon icon="skill-icons:instagram" width={30} />,
    },
  ];

  const payments = [
    {
      icon: <Icon icon="fontisto:visa" width={35} />,
    },
    {
      icon: <Icon icon="fontisto:paypal" width={35} />,
    },
    {
      icon: <Icon icon="formkit:discover" width={35} />,
    },
    {
      icon: <Icon icon="brandico:mastercard" width={35} />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#442DB9",
        borderRadius: "65px 65px 0 0",
        position: "relative",
        overflow: "hidden",
        padding: "54px 54px 20px",
        color: "white",
        direction: "rtl",
        userSelect: "text",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ paddingBottom: "30px", borderBottom: "2px solid #b3b3b3" }}
      >
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            {" "}
            فئات المزاد{" "}
          </Typography>
          {categories?.map((item) => (
            <Link
              style={{
                color: "white",
                display: "block",
                marginBottom: "15px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              key={item}
              to={"/"}
            >
              {item}{" "}
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            {" "}
            الصفحات{" "}
          </Typography>
          {pages?.map((item, index) => (
            <Link
              style={{
                color: "white",
                marginBottom: "15px",
                display: "block",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              key={index}
              to={item.link}
            >
              {item.title}{" "}
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            المساعده
          </Typography>
          {helps?.map((item, index) => (
            <Link
              style={{
                color: "white",
                marginBottom: "15px",
                display: "block",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              key={index}
              to={item.link}
            >
              {item.title}{" "}
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            تابعنا
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {followUs?.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
               {item.icon}
                <Typography sx={{ wordBreak: "break-all" }} component={"span"}>
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              marginTop: "50px",
              flexWrap: "wrap",
            }}
          >
            {links?.map((item, index) => (
              <a
                key={index}
                style={{
                  display: "flex",
                  borderRadius: "50%",
                  gap: "10px",
                  padding: "5px",
                  backgroundColor: "white",
                }}
                href={item.link}
              >
                 {item.icon} 
              </a>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <img src={logo} style={{ width: "80px" }} alt={"mazady-logo"} />
        <Box
            sx={{
              display: "flex",
              justifyContent:'center',
              alignItems:'center',
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {payments?.map((item, index) => (
              <a
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                color:'white'
                }}
                href='/'
              >
                 {item.icon} 
              </a>
            ))}
          </Box>
        <Typography component={"span"}>
          &copy; حقوق النشر محفوظه |{" "}
          <span className="text-danger"> مزادى </span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
