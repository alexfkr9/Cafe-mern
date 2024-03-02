import React from 'react';

import { OrdersList } from './OrdersList/OrdersList';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { Box, Grid } from '@mui/material';


export const AdminPage = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <OrdersList />
        </Grid>
        <Grid xs={12} md={6}>
          <OrderDetails />
        </Grid>
      </Grid>
    </Box>
  );

};
