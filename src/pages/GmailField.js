import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GmailCont from '../component/login/forgetPassword/gmailCont';
import GmailField from '../component/login/forgetPassword/gmailField';

const Gmail = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div dir='rtl' style={{ height: "100vh", backgroundColor: '#21204c' }}>
        <Grid container style={{ height: "100%" }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <GmailField />
          </Grid>
          {!isSmallScreen && ( // Render Login component only if screen size is not small
            <Grid item xs={12} sm={2.4} style={{ borderRadius: '0px 10px 10px 0px' , height:"416.02px" }}>
              <GmailCont />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default Gmail;
