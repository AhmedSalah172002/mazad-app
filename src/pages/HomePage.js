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
      <Bounce>
        <HomeLogin />
      </Bounce>
      <Slide>
        <HomeReviews />
      </Slide>
    </>
  );
};

export default HomePage;
