import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GetProductDetails from '../../hook/products/GetProductDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import Chatting from './Chatting'
import AddCartHook from '../../hook/cart/AddCartHook'

const MazadChat = () => {
    let {productId} = useParams()
    const [item]=GetProductDetails(productId)
    const [ addToCartHandel] = AddCartHook(productId)

    const calculateTimeDifference = () => {
        const difference = new Date(item?.BiddingEndTime) - new Date()  
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        if(hours == 0 && minutes == 0 && seconds == 0) {
          addToCartHandel(item?.mazad[item.mazad.length-1].user._id)
          setTimeout(() => {
            window.location.href="/"
          }, 1500);

        }
        return { hours, minutes, seconds };
      };
    
      const [timeDifference, setTimeDifference] = useState(calculateTimeDifference);

      
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeDifference(calculateTimeDifference());
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, [item]); 
    
  return (
    <>
    <div dir='rtl' className="mazadat">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="mazad-details mb-5">
                        <h5 className='mb-5'>تفاصيل المنتج</h5>
                        <img src={item.image} alt="image" style={{width:"150px",display:"block",margin:"auto"}} />
                        <p className='text-center text-black-50 fw-bold mt-3 mb-3'>{item.name}</p>
                        <p className='text-center text-black-50  mt-3 mb-3'>{item.description}</p>
                        <p className='text-center text-black-50 fw-bold mt-3 mb-3'> السعر المبدأي : {item.InitialPrice} جنية</p>
                        <p className='text-center text-black-50 fw-bold mt-3 mb-3'> أقل قيمة للمزايدة : {item.LowestBidValue} جنية</p>
                        <p className='text-center text-black-50 fw-bold mt-3 mb-3'> الوقت المتبقي للانتهاء : 
                        
                         {timeDifference.hours >=0 ? timeDifference.hours : 0}
                         :
                         {timeDifference.minutes >=0 ? timeDifference.minutes : 0}
                         :
                         {timeDifference.seconds >=0 ? timeDifference.seconds : 0}
                         </p>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="chatting">
                        <h5 className=' d-flex justify-content-between'>
                        <div className="merchant-name-chat d-flex">
                        <span className='merchant-icon'>{item.Merchant?.name[0].toUpperCase()}</span><span>{item.Merchant?.name}</span>
                        </div>
                        <div className="merchant-phone-chat">
                            <span>{item.Merchant?.phone} <FontAwesomeIcon icon={faPhone} /></span>
                        </div>
                        </h5>
                        <Chatting item={item}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default MazadChat
