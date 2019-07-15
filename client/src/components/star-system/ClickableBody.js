import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClickableBody = ({
  celestialBody: {
    _id,
    name,
    image_path
  },
  height,
  paddingLeft
}) => {
  console.log(paddingLeft)
  return (
    <li style={{paddingLeft}}>
      <Link to={'/solar_system/' + _id}>
        <img src={'/images/' + image_path} alt={name} style={{height: height}}/>
      </Link>
    </li>
  );
};


ClickableBody.propTypes = {
  celestialBody: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  paddingLeft: PropTypes.number.isRequired
};

export default ClickableBody;
