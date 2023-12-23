import React from 'react';
import { useRoutes } from './routes';
import { Navbar } from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllUsersPage } from './pages/AllUsersPage';
import { CreateMenuPage } from './pages/CreateMenuPage';

function App() {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Routes>
        {routes}

        {/* <Navbar />
        <div className='container'>{routes}</div>
         */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
