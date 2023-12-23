import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AllUsersPage } from './pages/AllUsersPage';
import { CreateMenuPage } from './pages/CreateMenuPage';
import { UserMenuPage } from './pages/UserMenuPage';

export const useRoutes = () => {
  return (
    <>
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
        path='/'
        element={
          <div style={{ padding: '20px' }}>
            <CreateMenuPage />
          </div>
        }
      ></Route>
      <Route path='*' element={<Navigate to='/create' replace />} />
    </>
  );
};
