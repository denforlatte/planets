import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/layout/Header';
import StarSystem from './components/star-system/StarSystem';
import CelestialBody from './components/celestial-body/CelestialBody';

// This routing is quite specific to just the Solar System but the structure itself is scaleable.
const App = () => {
  const [canEdit, setCanEdit] = useState(false);

  // 
  const toggleEditMode = async password => {
    if (canEdit) {
      delete axios.defaults.headers.common['x-auth-token'];
      setCanEdit(false);
    } else if (password) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let body = JSON.stringify({password});
      let res = await axios.post('/authentication', body, config);
      let token = res.data.token;
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        setCanEdit(true);
      }
    }
  };

  return (
    <Router>
      <Header canEdit={canEdit} toggleEditMode={toggleEditMode} />
      <Switch>
        <Route exact path="/" component={StarSystem} />
        <Route exact path="/solar_system/:id" render={(props) => <CelestialBody {...props} canEdit={canEdit} />}/>
      </Switch>
    </Router>
  );
};

export default App;
