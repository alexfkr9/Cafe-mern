import React from 'react';

import { OrdersList } from './OrdersList/OrdersList';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { Box, Grid } from '@mui/material';


export const AdminPage = () => {

  return (

    <Grid container spacing={2}>
      <Grid item xs={12} md={4} mt={4}>
        <OrdersList />
      </Grid>
      <Grid item xs={12} md={8} mt={4}>
        <OrderDetails />
      </Grid>
    </Grid>

  );

};
