import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.scss';

import { Pokedex } from './components';

const App = () => (
  <BrowserRouter>
    <Route
      render={() => (
        <Switch>
          <Route exact path="/" component={Pokedex} />
          <Route exact path="/" component={Pokedex} />
        </Switch>
      )}
    />
  </BrowserRouter>
);

export default App;
