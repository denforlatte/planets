import React from 'react';
import PropTypes from 'prop-types';

const ClickableBody = ({
  celestialBody: {
    id,
    name,
    type,
    image_path,
    distance_sun,
    mass,
    diameter,
    density,
    surface_gravity,
    number_of_moons,
    interesting_facts
  }
}) => {
  return (
    <>
      <h1>{name}</h1>
      <img src={'/images/' + image_path} />
    </>
  );
};

ClickableBody.propTypes = {};

export default ClickableBody;
