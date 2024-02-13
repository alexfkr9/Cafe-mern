import React from 'react';
import { useRoutes } from './routes/routes';
import { Navbar } from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllUsersPage } from './pages/AllUsersPage';
import { CreateMenuPage } from './pages/CreateMenuPage';

function App() {
  const Routes = useRoutes;

  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Navbar />
        </div>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
