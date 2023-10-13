import React from 'react'
import MerchantProducts from '../component/product/MerchantProducts'
import GetAllMerchProducts from '../hook/products/GetAllMerchProducts'

const MerchantProductsPage = () => {
    const [items,filter , setFilter ,onPress,pageCount,results] = GetAllMerchProducts(12)

  return (
   <>
   <MerchantProducts items={items} onPress={onPress} pageCount={pageCount}/>
   </>
  )
}

export default MerchantProductsPage
