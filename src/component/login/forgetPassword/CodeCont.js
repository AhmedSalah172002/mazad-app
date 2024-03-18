import React from 'react';
import { Container, Typography } from '@mui/material';



const CodeCont = () => {
  
  return (
    <>
      <Container  className="login-page" sx={{ borderRadius: '10px 0px 0px 10px', display: 'flex', justifyContent: 'space-between', alignItems: "center", flexDirection: "column", overflow: "hidden",     height: "100%", backgroundColor: "rgb(64 61 168)" }}>
        <div>
        <svg style={{position:"relative" , left :"10px"}} width="298" height="230" viewBox="0 0 298 277" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50.5 113C19.3252 65.728 0 7.5 0 7.5V0.5L298 0V276.5C298 276.5 297.879 277.36 287.5 275.5C233.563 265.834 256.071 135.388 202 126.5C169.406 121.142 197.579 198.628 165.5 206.5C93.7172 224.114 91.1916 174.703 50.5 113Z" fill="#DB2768"/>
</svg>

          
        </div>
        <div>
          <Typography variant="h4" className='text-light text-center'>أهلا بكم فى موقع مزادى</Typography>
        </div>
        <div>

        <svg width="330" height="220" viewBox="0 0 330 259" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M202 190.5C245.5 199.5 287.5 185 310.5 196.5C346.382 214.441 321.5 258 321.5 258L19 258.5C6 258.5 0 246.5 0 240.5V8.49998C0 8.49998 110.756 -18.7336 109 27.4999C107.7 61.7269 46 107 78 130.5C110 154 138.5 87.4999 177 109C215.5 130.5 158.5 181.5 202 190.5Z" fill="#DB2768"/>
</svg>

        </div>
      </Container>
    </>
  );
}

export default CodeCont;
