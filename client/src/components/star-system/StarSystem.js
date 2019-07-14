import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

import SelectBody from '../layout/SelectBody';
import ClickableBody from './ClickableBody';

const StarSystem = props => {
  const [celestialBodies, setCelestialBodies] = useState([]);

  useEffect(() =>{
    axios.get(`/star_system`)
    .then(res => setCelestialBodies(res.data));
  }, []);

  return (
    <>
      <SelectBody celestialBodies={celestialBodies} />
      <h1>Solar Systems</h1>
      <main>
        {celestialBodies.map(body => (
          <ClickableBody key={body._id} celestialBody={body}/>
        ))}
      </main>
    </>
  )
}

StarSystem.propTypes = {

}

export default StarSystem
