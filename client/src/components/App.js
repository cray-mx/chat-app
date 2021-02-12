import React from 'react';
import Login from './login';
import Signup from './signup';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <Signup />
        </Route>
        <Route path="/">
          <Login />
        </Route>       
      </Switch>      
    </Router>
  );
}

export default App;