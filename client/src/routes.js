import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {AllUsersPage} from './pages/AllUsersPage'
import {CreateMenuPage} from './pages/CreateMenuPage'
import {UserMenuPage} from './pages/UserMenuPage'

import {TestAllUsersPage} from './pages/TestAllUsersPage'

export const useRoutes = isAuthenticated => {

  // if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/all-user" exact>
          <div style={{ padding: '20px' }}>          
            <AllUsersPage />
          </div>
        </Route>
        <Route path="/test" exact>
          <div style={{ padding: '20px' }}>          
            <TestAllUsersPage />
          </div>
        </Route>
        <Route path="/user" exact>
          <div style={{ padding: '20px' }}>          
            <UserMenuPage />
          </div>
        </Route>
        <Route path="/create" exact>
          <div style={{ padding: '20px' }}>
            <CreateMenuPage />
          </div>  
        </Route>        
        <Redirect to="/create" />
      </Switch>
    )
  // }

  // return (
  //   <Switch>
  //     <Route path="/" exact>
  //       <div style={{ padding: '30px' }}>
  //         <h1>Material Table Example</h1>
  //         <MTable />
  //       </div>
  //     </Route>
  //     <Redirect to="/" />
  //   </Switch>
  // )
}
