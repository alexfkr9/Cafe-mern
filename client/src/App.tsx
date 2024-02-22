import React from 'react';
import { GetRoutes } from './routes/GetRoutes';
import { Navbar } from './components/Navbar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Box sx={{ p: 2 }}>
          <GetRoutes />
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
