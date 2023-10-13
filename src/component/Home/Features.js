import React from 'react'
import co from "../../images/co-icon.svg"
import fix from "../../images/fix-icon.svg"
import wallet from "../../images/wallet-icon.svg"
const Features = () => {
  return (
    <div dir='rtl' className="features mb-5 mt-5">
        <div className="container">
           <div className="feature-head text-center mb-5">
                <h1 className=' mb-3'>لماذا منصة المزاد الإلكترونية ؟</h1>
                    <p className='mb-5'>تمكنك منصة المزاد الإلكترونية من المشاركة في
                        المزادات المطروحة بكل سهولة وأمان</p>
           </div>
            <div className="row mt-5">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="feature mb-5 text-center">
                        <div className="feature-img">
                            <img src={co} alt="co" className="img-fluid d-block m-auto" />
                        </div>
                        <h4 className='mt-3 mb-5'>المشاركة عن بُعد</h4>
                        <p>بإمكانك المزايدة بشكل إلكتروني في أي وقت ومن أي مكان دون
                            الحاجة إلى حضور المزاد العلني</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="feature mb-5 text-center">
                        <div className="feature-img">
                            <img src={fix} alt="co" className="img-fluid d-block m-auto" />
                        </div>
                        <h4 className='mt-3 mb-5'>المزايدة في أكثر من مزاد في نفس الوقت</h4>
                        <p>تستطيع المزايدة على عدة مزادات مختلفة في نفس الوقت</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="feature mb-5 text-center">
                        <div className="feature-img">
                            <img src={wallet} alt="co" className="img-fluid d-block m-auto" />
                        </div>
                        <h4 className='mt-3 mb-5'>وسائل دفع إلكترونية</h4>
                        <p>توفر المنصة وسائل دفع إلكترونية آمنه يمكنك من خلالها شحن محفظتك واسترجاع المبلغ بكل أمان</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features
