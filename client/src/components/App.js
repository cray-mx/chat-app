import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Chat from './chat';
import NotFound from './notFound';
import PrivateRoute from './privateRoute';
import { UserContext } from './userContext';

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
          <Switch>
              <PrivateRoute exact path="/" component={Chat} />
              <Route path="/login" component={Login}/>
              <Route path="/sign-up" component={Signup}/>
              <Route component={NotFound} />
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;