import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Header = ({ canEdit, toggleEditMode }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [input, setInput] = useState('');

  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  // Send the input to the toggle edit, wipe the input, close the modal
  const handleOnSumbit = () => {
    toggleEditMode(input);
    setInput('');
    setToggleModal(false);
  }

  // Display an edit/stop edit button with modal password input
  return (
    <header>
      <Link to='/' className="font--primary"><h1>The Solar System</h1></Link>
      {canEdit ? (
        <Button onClick={() => toggleEditMode()}>Stop Editing</Button>
      ) : (
        <Button onClick={() => setToggleModal(true)}>Edit</Button>
      )}
      <Modal isOpen={toggleModal} toggle={() => setToggleModal(false)}>
          <ModalHeader toggle={() => setToggleModal(false)} className="font--secondary">Enter Password</ModalHeader>
          <ModalBody className="font--secondary">
            <p>Please enter the password to enable edit mode.</p>
            <input onChange={e => handleOnChange(e)}></input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleOnSumbit()}>Submit</Button>{' '}
            <Button color="secondary" onClick={() => setToggleModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
    </header>
  );
};

Header.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired
};

export default Header;
