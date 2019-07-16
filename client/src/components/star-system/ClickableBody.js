import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';

const ClickableBody = ({
  celestialBody: {
    _id,
    name,
    image_path
  },
  height,
  paddingLeft
}) => {
  const [ tooltipOpen, setTooltipOpen ] = useState(false);

  return (
    <li style={{paddingLeft}}>
      <Link to={'/solar_system/' + _id}>
        <img src={'/images/' + image_path} alt={name} style={{height: height}} id={'body_' + _id}/>
      </Link>
      <Tooltip placement="right" isOpen={tooltipOpen} target={'body_' + _id} toggle={() => setTooltipOpen(!tooltipOpen)}>
        {name}
      </Tooltip>
    </li>
  );
};


ClickableBody.propTypes = {
  celestialBody: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  paddingLeft: PropTypes.number.isRequired
};

export default ClickableBody;
