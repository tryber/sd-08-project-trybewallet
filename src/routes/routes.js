import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from '../App';
import Login from '../pages/Login';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path="/"><Login /></Route>
      </Switch>
    </App>
  );
}
