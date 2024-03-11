import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdminPage } from '../pages/AdminPage/AdminPage';
import { CreateMenuPage } from '../pages/CreateMenuPage';
import { UserMenuPage } from '../pages/UserMenuPage';

export const GetRoutes = () => {
  return (
    <Routes>
      <Route path='/user' element={<UserMenuPage />}></Route>
      <Route path='/admin' element={<AdminPage />}></Route>
      <Route path='/create-menu' element={<CreateMenuPage />}></Route>
      {/* <Route path='*' element={<Navigate to='/user' replace />} /> */}
    </Routes>
  );
};
