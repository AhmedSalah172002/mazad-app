import React from "react";
import GetAllProducts from "../hook/products/GetAllProducts";
import Hero from "../component/Home/Hero";
import Category from "../component/Home/Category";
import WhyMazady from "../component/Home/WhyMazady";
import HomeProducts from "../component/Home/HomeProducts";
import HowToUse from "../component/Home/HowToUse";
import HomeLogin from "../component/Home/HomeLogin";
import HomeReviews from "../component/Home/HomeReviews";
import { Fade, Zoom, Bounce, Slide } from "react-awesome-reveal";

const HomePage = () => {
  const [items, filter, setFilter, onPress, pageCount, results] =
    GetAllProducts(4);
  let auth;
  if (localStorage.getItem("user") !== null) {
    auth = JSON.parse(localStorage.getItem("user"));
  }
  return (
    <>
      <Fade>
        <Hero />
      </Fade>
      <Bounce>
        <Category />
      </Bounce>
      <Zoom>
        <WhyMazady />
      </Zoom>
      <Slide>
        <HomeProducts items={items} />
      </Slide>
      <Slide direction="right">
        <HowToUse />
      </Slide>
      {!auth && (
        <Bounce>
          <HomeLogin />
        </Bounce>
      )}
      <Slide>
        <HomeReviews />
      </Slide>
    </>
  );
};

export default HomePage;
