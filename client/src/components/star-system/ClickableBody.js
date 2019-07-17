import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import numeral from 'numeral';


// An image link with mouseover info on wider screens.
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

  // The image is in a div container to give it some space to center itself and make the bodies line up neater.
  return (
    <li style={{paddingLeft, width: "400px"}}>
      <Link to={'/solar_system/' + _id}>
        <div style={{width: "400px", overflow: "visible", textAlign: "center"}}>
          <img src={'/images/' + image_path} alt={name} style={{height: height}} id={'body_' + _id}/>
        </div>
      </Link>
      
      {/* I found a bug with Reactstrap that caused the app to freeze if there was not enough space for the tooltip.
          To get around this, and as it is not really needed for mobile devices, the tooltip will not render under 801px wide. */}
      {window.innerWidth > 800 && (
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
