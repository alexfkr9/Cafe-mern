import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdminPage } from '../pages/AdminPage/AdminPage';
import { CreateMenuPage } from '../pages/CreateMenuPage';
import { MainPage } from '../pages/MainPage';
import { CreateDishPage } from '../pages/CreateDishPage/CreateDishPage';

export const GetRoutes = () => {
  return (
    <Routes>
      <Route path='/user' element={<MainPage />}></Route>
      <Route path='/admin' element={<AdminPage />}></Route>
      <Route path='/create-menu' element={<CreateMenuPage />}></Route>
      <Route path='/create-dish' element={<CreateDishPage />}></Route>
      <Route path='*' element={<Navigate to='/user' replace />} />
    </Routes>
  );
};
