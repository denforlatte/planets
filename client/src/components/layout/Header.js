import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Header = ({canEdit, setCanEdit}) => {
  return (
    <header>
      <h1>The Solar System</h1>
      <Button>Edit</Button>
    </header>
  );
};

Header.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  setCanEdit: PropTypes.func.isRequired
};

export default Header;
