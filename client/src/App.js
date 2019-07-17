import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/layout/Header';
import StarSystem from './components/star-system/StarSystem';
import CelestialBody from './components/celestial-body/CelestialBody';


const App = () => {
  const [canEdit, setCanEdit] = useState(false);
  const [error, setError] = useState(null);

  // This function will toggle edit mode on and off. When enabling edit mode it sends a password and 
  // requests a session token to add to request headers. When disabling edit mode, the token is cleared
  // and canEdit state reset to false.
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

      try {
        let res = await axios.post('/authentication', body, config);

        let token = res.data.token;
        if (token) {
          axios.defaults.headers.common['x-auth-token'] = token;
          setCanEdit(true);
        }
      } catch (error) {
        console.log(error.message);
        setError('Unable to verify. Is password correct?');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  // This routing is quite specific to just the Solar System but the structure itself is scaleable.
  return (
    <Router>
      <Header canEdit={canEdit} toggleEditMode={toggleEditMode} />
      {error && <h4>{error}</h4>}
      <Switch>
        <Route exact path="/" component={StarSystem} />
        <Route exact path="/solar_system/:id" render={(props) => <CelestialBody {...props} canEdit={canEdit} />}/>
      </Switch>
    </Router>
  );
};

export default App;
