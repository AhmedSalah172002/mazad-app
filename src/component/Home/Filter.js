import React from 'react'
import Select from 'react-select'
import filterImg from "../../images/my-auctions.png"

const Filter = ({setFilter}) => {
    const options = [
        { value: "not-started", label: 'قادم' },
        { value: "start-now", label: 'جارى' },
        { value: "finished", label: 'منتهى' },
        { value: "", label: 'الكل' }

        
      ]
  return (
  <>
  <div dir='rtl' className="filter-home mt-5 mb-5">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="filter-cont mb-5">
                    <h3 className='mb-3'>ابحث عن مزاد</h3>
                    <p className='mb-5'>ابحث بالتصنيفات لتسهيل عملية البحث عن عقار مناسب لك</p>
                    <Select options={options} onChange={(val)=>setFilter(val.value)} />
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="filter-image">
                    <img src={filterImg}  alt="filter" />
                </div>
            </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default Filter
