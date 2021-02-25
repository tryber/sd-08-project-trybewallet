import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Route path="/">
      <Login />
    </Route>
  );
}

export default App;
