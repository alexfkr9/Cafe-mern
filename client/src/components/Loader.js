import React from 'react'

import { CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10rem'}}>
              <CircularProgress />
        </div>
  )
}