import React, {useState, useEffect} from 'react';
import axios from 'axios';
import numeral from 'numeral';

import SelectBody from '../layout/SelectBody';
import BodyDatum from './BodyDatum';
import InterestingFacts from './InterestingFacts';

const CelestialBody = ({ match, canEdit }) => {
  const [celestialBodies, setCelestialBodies] = useState([]);
  const [celestialBody, setCelestialBody] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/star_system`)
    .then(res => setCelestialBodies(res.data))
    .catch(() => setError('Could not retrieve star system data, please refresh or try again later.'));

    axios.get(`/celestial_body/${match.params.id}`)
    .then(res => setCelestialBody(res.data))
    .catch(() => setError('Could not retrieve celestial body data, please refresh or try again later.'));
  }, [match.params.id]);

  const { _id, name, type, image_path, distance_sun, mass, diameter, density, surface_gravity, number_of_moons, interesting_facts } = celestialBody;

  return (
    <>
      <SelectBody celestialBodies={celestialBodies} />
      <main className="celestialbody--container">
        {error && <h4>{error}</h4>}
        {Object.entries(celestialBody).length > 0 ? (
          <>
            <h2>{name}</h2>
            <BodyDatum _id={_id} property="type" label="Type" datum={type} canEdit={canEdit} setCelestialBody={setCelestialBody} />

            <section className="celestialbody--table">
              <img src={'/images/' + image_path} alt={name} className="celestialbody--image"/>
              <div>
                {distance_sun && <BodyDatum _id={_id} property="distance_sun" label="Distance from Sun" datum={numeral(distance_sun).format('0,0')} unit="Km" canEdit={canEdit} setCelestialBody={setCelestialBody} />}

                <BodyDatum _id={_id} property="mass" label="Mass" datum={numeral(mass).format('0,0')} unit="Kg" canEdit={canEdit} setCelestialBody={setCelestialBody} />
                <BodyDatum _id={_id} property="diameter" label="Diameter" datum={numeral(diameter).format('0,0')} unit="Km" canEdit={canEdit} setCelestialBody={setCelestialBody} />
                <BodyDatum _id={_id} property="density" label="Density" datum={numeral(density).format('0,0')} unit={<>Kg/m<sup>3</sup></>} canEdit={canEdit} setCelestialBody={setCelestialBody} />
                <BodyDatum _id={_id} property="surface_gravity" label="Surface Gravity" datum={numeral(surface_gravity).format('0,0.00')} unit={<>m/s<sup>2</sup></>} canEdit={canEdit} setCelestialBody={setCelestialBody} />
                <BodyDatum _id={_id} property="number_of_moons" label="Number of Moons" datum={number_of_moons} canEdit={canEdit} setCelestialBody={setCelestialBody} />
              </div>
            </section>

            <InterestingFacts _id={_id} interesting_facts={interesting_facts} canEdit={canEdit} setCelestialBody={setCelestialBody} />
          </>
        ) : <p>Loading...</p>}
      </main>
    </>
  )
}

export default CelestialBody
