import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AllUsersPage } from '../pages/AllUsersPage';
import { CreateMenuPage } from '../pages/CreateMenuPage';
import { UserMenuPage } from '../pages/UserMenuPage';

export const GetRoutes = () => {
  return (
    <Routes>
      <Route path='/all-user' element={<AllUsersPage />}></Route>
      <Route path='/user' element={<UserMenuPage />}></Route>
      <Route path='/create' element={<CreateMenuPage />}></Route>
      <Route path='*' element={<Navigate to='/create' replace />} />
    </Routes>
  );
};
