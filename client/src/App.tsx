import React from 'react';
import { GetRoutes } from './routes/GetRoutes';
import { Navbar } from './components/Navbar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Navbar />
        </div>
        <GetRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
