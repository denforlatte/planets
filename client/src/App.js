import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header';
import StarSystem from './components/star-system/StarSystem';
import CelestialBody from './components/celestial-body/CelestialBody';

// This routing is quite specific to just the Solar System but the structure itself is scaleable.
const App = () => {
  const [canEdit, setCanEdit] = useState(false);

  return (
    <Router>
      <Header canEdit={canEdit} setCanEdit={setCanEdit}/>
      <Switch>
        <Route exact path="/" component={StarSystem} />
        <Route exact path="/:id" component={CelestialBody} />
      </Switch>
    </Router>
  );
};

export default App;
