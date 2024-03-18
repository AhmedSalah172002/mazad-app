import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Login from '../component/login/Login';
import LoginCont from '../component/login/LoginCont';

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div dir='rtl' style={{ height: "100vh", backgroundColor: '#21204c' }}>
        <Grid container style={{ height: "100%" }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <LoginCont />
          </Grid>
          {!isSmallScreen && ( // Render Login component only if screen size is not small
            <Grid item xs={12} sm={2.4} style={{ borderRadius: '0px 10px 10px 0px' ,height:"561px"}}>
              <Login />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default LoginPage;
