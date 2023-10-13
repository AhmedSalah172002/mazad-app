import React from 'react';
import logo from "../../images/logo.svg"
import facebook from "../../images/facebook.png"
import twitter from "../../images/twitter.png"
import linkedIn from "../../images/linkedin.png"
import instagram from "../../images/instagram.png"

import phone from "../../images/phone-call.png"
import email from "../../images/email.png"
import home from "../../images/home-button.png"
import fax from "../../images/fax.png"
function Footer() {
  return (
    <div className=" ">
      <footer dir='ltr' className="text-center text-lg-start" style={{ borderTop: '2px solid #ebeff1',color:"#262929" }}>
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-md-12 col-lg-4  mx-auto mt-3">
                <img src={logo} alt="img" style={{width:"200px",display:"block",margin:"auto"}} className='mb-3' />
               <p>المزاد هي
                    المنصة الرائدة للمزادات من تطوير وتشغيل شركة ثقة والتي تمكن
                    المستفيدين من إجراء عمليات المزايدة وطرح المنتجات المراد بيعها
                    بسهولة وأمان، وتتيح المنصة المشاركة في مزادات متنوعة من أي
                    مكان بشكل يتوافق مع قوانين إقامة المزادات والبيع والشراء في
                    جمهورية مصر العربية</p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-12 col-lg-4 mx-auto mt-3">
                <h6 className="mb-4 font-weight-bold">تواصل معنا</h6>
                <p className='mb-4'><img src={phone} style={{width:"20px",marginRight:"5px"}} alt="phone" />  +201095572350</p>
                <p className='mb-4'><img src={email} style={{width:"20px",marginRight:"5px"}} alt="email" />  ahmed172002tayel@gmail.com</p>
                <p className='mb-4'><img src={home} style={{width:"20px",marginRight:"5px"}} alt="phone" />  Menoufia , Egypt</p>
                <p className='mb-4'><img src={fax} style={{width:"20px",marginRight:"5px"}} alt="phone" />  3232265(013)</p>
              </div>

            
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                <div className="p-3">
                  © 2023 Copyright : <img src={logo} alt="logo" style={{width:"80px"}} />
                </div>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                <a className="btn text-black btn-outline-light btn-floating m-1" role="button">
                <img src={facebook} style={{width:"20px",marginRight:"5px"}} alt="social" />
                </a>
                <a className="btn text-black btn-outline-light btn-floating m-1" role="button">
                <img src={twitter} style={{width:"20px",marginRight:"5px"}} alt="social" />
                </a>
                <a className="btn text-black btn-outline-light btn-floating m-1" role="button">
                <img src={linkedIn} style={{width:"20px",marginRight:"5px"}} alt="social" />
                </a>
                <a className="btn text-black btn-outline-light btn-floating m-1" role="button">
                <img src={instagram} style={{width:"20px",marginRight:"5px"}} alt="social" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
