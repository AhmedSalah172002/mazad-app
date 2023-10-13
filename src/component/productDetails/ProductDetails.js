import React, { useEffect, useState } from 'react'
import pro from "../../images/13015.jpg"
import clock from "../../images/clock.svg"
import { useParams } from 'react-router-dom';
import GetProductDetails from '../../hook/products/GetProductDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
const ProductDetails = () => {
    let {productId} = useParams()
        const [item]=GetProductDetails(productId)

        const NumberOfClients = ()=>{
          let mazadArr=item.mazad
          let arr=[]
          for (let i = 0; i < mazadArr.length; i++) {
            arr.push(mazadArr[i]?.user?._id)
            
          }
          return arr
        }

        const handleWhatsAppClick = () => {
            const url = `https://wa.me/${item.Merchant.phone}`;
            window.open(url, '_blank');
          };
    const calculateTimeDifference = () => {
        const difference =new Date(item.BiddingStartTime)- new Date() 
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      };
    
      const [timeDifference, setTimeDifference] = useState(calculateTimeDifference);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeDifference(calculateTimeDifference());
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []); 


  return (
    <>
    <div dir='rtl' className="product-details">
        <div className="container">
            <div className="final-price mt-5 mb-5">
                <p>اعلى قيمة للمزايدة</p>
                <h1 className='mt-3'> {item?.mazad?.length >= 1 ? item.mazad[item?.mazad?.length-1]?.price : 0} جنية مصري</h1>
            </div>
            <hr />
            <div className="productDetails mt-5 mb-5">
               <div className="row">
                <div className="col-lg-6 col-md-12">
                <div className="details-img">
                    <img src={item.image} style={{width:"300px",display:"block",margin:"auto"}} alt="pro"  />
                </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="details-text mt-5">
                        <span>رقم المزاد : {item._id}</span>
                        <h2 className='mt-3 mb-5'>{item.name}</h2>
                        <img src={clock}  alt="clock" className='img-fluid' />
                        <div className="date d-flex mt-3 ">
                        <div className="day d-flex align-items-center flex-column">
                        <p>{timeDifference.days>=0 ? timeDifference.days : 0}</p>
                        <span>يوم</span>
                        </div>
                        <div className="hours d-flex align-items-center flex-column">
                            <p>{timeDifference.hours >=0 ? timeDifference.hours : 0}</p>
                            <span>ساعه</span>
                        </div>
                        <div className="minutes d-flex align-items-center flex-column">
                            <p>{timeDifference.minutes >=0 ? timeDifference.minutes : 0}</p>
                            <span>دقيقة</span>
                        </div>
                        <div className="seconds d-flex align-items-center flex-column">
                            <p>{timeDifference.seconds >=0 ? timeDifference.seconds : 0}</p>
                            <span>ثانية</span>
                        </div>
                    </div>
                    </div>
                </div>
               </div>
                
            </div>
        </div>
        <div className="more-details px-5 mt-5 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-12 mb-5">
                <h2>تفاصيل اكثر :</h2>
                <p className='mb-5'>{item.description}</p>

                {
                  item?.mazad?.length >=1 ? <p>عدد المشاركين : <span style={{color:"#07c0de"}}>{[...new Set(NumberOfClients())].length}</span></p>:null
                }
                {
                  item?.mazad?.length >=1 ? <p>عدد المزايدات : <span style={{color:"#07c0de"}}>{item.mazad.length}</span></p>:null
                }

                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="Merchant">
                        <h4>معلومات وكيل البيع</h4>
                        <p>{item.Merchant?.name}</p>
                        <div className="Merchant-contat d-flex justify-content-between">
                            <p>رقم التواصل</p>
                            <p>{item.Merchant?.phone}</p>
                        </div>
                        <button onClick={()=>handleWhatsAppClick()} className='whatsapp'> <FontAwesomeIcon style={{fontSize:"20px",marginLeft:"10px"}} icon={faWhatsapp} /> تواصل عبر الواتس اب</button>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails
