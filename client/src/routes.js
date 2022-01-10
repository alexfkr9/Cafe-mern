import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AllUsersPage } from './pages/AllUsersPage';
import { CreateMenuPage } from './pages/CreateMenuPage';
import { UserMenuPage } from './pages/UserMenuPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/all-user' exact>
        <div style={{ padding: '20px' }}>
          <AllUsersPage />
        </div>
      </Route>
      <Route path='/user' exact>
        <div style={{ padding: '20px' }}>
          <UserMenuPage />
        </div>
      </Route>
      <Route path='/create' exact>
        <div style={{ padding: '20px' }}>
          <CreateMenuPage />
        </div>
      </Route>
      <Redirect to='/create' />
    </Switch>
  );
};
