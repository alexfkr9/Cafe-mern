import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AllUsersPage } from '../pages/AllUsersPage';
import { CreateMenuPage } from '../pages/CreateMenuPage';
import { UserMenuPage } from '../pages/UserMenuPage';

export const GetRoutes = () => {
  return (
    <Routes>
      <Route
        path='/all-user'
        element={
          <div style={{ padding: '20px' }}>
            <AllUsersPage />
          </div>
        }
      ></Route>
      <Route
        path='/user'
        element={
          <div style={{ padding: '20px' }}>
            <UserMenuPage />
          </div>
        }
      ></Route>
      <Route
        path='/create'
        element={
          <div style={{ padding: '20px' }}>
            <CreateMenuPage />
          </div>
        }
      ></Route>
      <Route path='*' element={<Navigate to='/create' replace />} />
    </Routes>
  );
};
