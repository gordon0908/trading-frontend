import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from '../containers/nav.container';
import GraphicContainer from '../containers/graphic.container';
import RealTimeContainer from '../containers/realtime.container';
import SystemContainer from '../containers/system.container';
import WelcomeContainer from '../containers/welcome.container';
import NotFoundContainer from '../containers/not.found.container';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Switch>
        <Route path="/" component={WelcomeContainer} exact />
        <Route path="/realtime" component={RealTimeContainer} />
        <Route path="/system" component={SystemContainer}  />
        <Route component={NotFoundContainer} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
