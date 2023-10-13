import React from 'react'
import Landing from "../component/Home/Landing"
import Features from "../component/Home/Features"
import Filter from '../component/Home/Filter'
import Products from '../component/Home/Products'
import GetAllProducts from '../hook/products/GetAllProducts'


const HomePage = () => {
  const [items,filter , setFilter ,onPress,pageCount,results] = GetAllProducts(12)
  return (
   <>
    <Landing />
   <Features />
   <Filter setFilter={setFilter}/>
   <Products items={items}  onPress={onPress} pageCount={pageCount}  />
   </>
  )
}

export default HomePage
