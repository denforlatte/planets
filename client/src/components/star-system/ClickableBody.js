import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import numeral from 'numeral';

const ClickableBody = ({
  celestialBody: {
    _id,
    name,
    image_path,
    distance_sun,
    diameter
  },
  height,
  paddingLeft
}) => {
  const [ tooltipOpen, setTooltipOpen ] = useState(false);

  return (
    <li style={{paddingLeft}}>
      <Link to={'/solar_system/' + _id}>
        <div style={{width: "400px", overflow: "visible", textAlign: "center"}}>
          <img src={'/images/' + image_path} alt={name} style={{height: height}} id={'body_' + _id}/>
        </div>
      </Link>
      
      {window.innerWidth > 1000 && (
        <Tooltip placement="right" isOpen={tooltipOpen} target={'body_' + _id} toggle={() => setTooltipOpen(!tooltipOpen)} style={{lineHeight: "1rem"}}>
        <h6>{name}</h6>
        {distance_sun && <p>Distance to Sun: {numeral(distance_sun).format('0,0')} km</p>}
        <p>Diameter: {numeral(diameter).format('0,0')} km</p>
        <p>Click on the image for more</p>
      </Tooltip>
      )}
    </li>
  );
};


ClickableBody.propTypes = {
  celestialBody: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  paddingLeft: PropTypes.number.isRequired
};

export default ClickableBody;
