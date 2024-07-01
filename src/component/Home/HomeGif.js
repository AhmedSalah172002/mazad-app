import React from 'react'
import gif from '../../images/home.gif'
const HomeGif = () => {
  return (
    <div style={{margin:'15px 0px'}}>
        <div className='container' >
        <img src={gif} style={{width:'100%',borderRadius:'8px',height:'450px'}} alt='cover' />
        </div>
      
    </div>
  )
}

export default HomeGif
