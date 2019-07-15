import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const SelectBody = ({ celestialBodies }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="button--dropdown">
      <ButtonDropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <DropdownToggle caret>Select a celestial body</DropdownToggle>
        <DropdownMenu>
          {celestialBodies.map(body => (
            <DropdownItem key={body._id}>
              <Link to={'/solar_system/' + body._id}>{body.name}</Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </nav>
  );
};

SelectBody.propTypes = {
  celestialBodies: PropTypes.array.isRequired
};

export default SelectBody;
