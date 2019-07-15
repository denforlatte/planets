import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClickableBody = ({
  celestialBody: {
    _id,
    name,
    image_path
  },
  height
}) => {
  return (
    <li>
      <Link to={'/solar_system/' + _id}>
        <img src={'/images/' + image_path} alt={name} style={{height: height}}/>
      </Link>
    </li>
  );
};


ClickableBody.propTypes = {
  celestialBody: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired
};

export default ClickableBody;
