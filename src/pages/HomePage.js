import React from 'react'
import GetAllProducts from '../hook/products/GetAllProducts'
import Hero from '../component/Home/Hero'
import Category from '../component/Home/Category'
import WhyMazady from '../component/Home/WhyMazady'
import HomeProducts from '../component/Home/HomeProducts'
import HowToUse from '../component/Home/HowToUse'
import HomeLogin from '../component/Home/HomeLogin'
import HomeReviews from '../component/Home/HomeReviews'


const HomePage = () => {
  const [items,filter , setFilter ,onPress,pageCount,results] = GetAllProducts(12)
  return (
   <>
    <Hero />
    <Category />
    <WhyMazady />
   <HomeProducts  />
   <HowToUse />
   <HomeLogin />
   <HomeReviews />
   </>
  )
}

export default HomePage
