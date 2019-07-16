import React, {useState, useEffect} from 'react';
import axios from 'axios'

import SelectBody from '../layout/SelectBody';

const CelestialBody = props => {
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [celestialBody, setCelestialBody] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/star_system`)
    .then(res => setCelestialBodies(res.data))
    .catch(() => setError('Could not retrieve star system data, please refresh or try again later.'));

    axios.get(`/celestial_body/${props.match.params.id}`)
    .then(res => setCelestialBody(res.data))
    .catch(() => setError('Could not retrieve celestial body data, please refresh or try again later.'));
  }, [props.match.params.id]);

  const { name, type, image_path, distance_sun, mass, diameter, density, surface_gravity, number_of_moons, interesting_facts } = celestialBody;

  return (
    <>
      <SelectBody celestialBodies={celestialBodies} />
      <main className="celestialbody--container">
        {error && <h4>{error}</h4>}
        {Object.entries(celestialBody).length > 0 ? (
          <>
            <h2>{name}</h2>
            <p><strong>Type: </strong>{type}</p>

            <section className="celestialbody--table">
              <img src={'/images/' + image_path} alt={name} className="celestialbody--image"/>
              <div>
                {distance_sun && <p><strong>Distance from Sun: </strong>{distance_sun} km</p>}
                <p><strong>Mass: </strong>{mass} Kg</p>
                <p><strong>Diameter: </strong>{diameter} km</p>
                <p><strong>Density: </strong>{density} Kg/m<sup>3</sup></p>
                <p><strong>Surface Gravity: </strong>{surface_gravity} m/s<sup>2</sup></p>
                <p><strong>Number of moons: </strong>{number_of_moons}</p>
              </div>
            </section>

            {interesting_facts.length > 0 && (
              <section className="interestingfacts">
                <h3>Interesting Facts</h3>
                {interesting_facts.map((fact, i) => (
                  <p key={'fact_' + i}>{fact}</p>
                ))}
              </section>
            )}
          </>
        ) : <p>Loading...</p>}
      </main>
    </>
  )
}

export default CelestialBody
