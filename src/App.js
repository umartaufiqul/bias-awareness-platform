import React from 'react';
import './App.css';
import Introduction from "./pages/Introduction"
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div>
        <Switch>
          <Route exact path='/' component={Introduction}></Route>
          <Route path='/bias-awareness' component={Main}></Route>
        </Switch>
    </div>
  );
}

export default App;
