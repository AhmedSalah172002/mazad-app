import React from 'react'
import ProductCard from '../Home/ProductCard'
import Pagination from '../utils/Pagination'

const MerchantProducts = ({items ,pageCount ,onPress}) => {
  return (
    <>
    <div dir='rtl' className="products mt-5 mb-5">
     <div className="container">
         <div className="row">
             {
                 items ? items.map((e)=>{
                     return (
                         <div key={e._id} className="col-lg-3 col-md-6 col-sm-12">
                         <ProductCard name={e.name} Merchant={e.Merchant._id} productId={e._id}  status={e.status} image={e.image} BiddingEndTime={e.BiddingEndTime} BiddingStartTime={e.BiddingStartTime} />
                     </div>
                     )
                 }) :null
             }
            
            
         </div>
         {
            pageCount > 1 ? <Pagination  pageCount={pageCount} onPress={onPress}/> : null
        }
     </div>
    </div>
    </>
  )
}

export default MerchantProducts
