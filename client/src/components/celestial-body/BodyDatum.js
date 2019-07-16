import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const BodyDatum = ({_id, property, label, datum, unit, canEdit, setCelestialBody }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [input, setInput] = useState('');

  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  // Send the input to the toggle edit, wipe the input, close the modal
  const handleOnSumbit = () => {
    submitValue(input);
    setInput('');
    setToggleModal(false);
  };

  const submitValue = (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body = JSON.stringify({[property]: value});

    axios.put('/celestial_body/' + _id, body, config)
    .then(res => setCelestialBody(res.data));
  }

  return (
    <p>
      <strong>{label + ': '}</strong>
      {datum} {unit}{' '}
      {canEdit && <i className="hover fas fa-pen-square" onClick={() => setToggleModal(true)} />}
      
      <Modal isOpen={toggleModal} toggle={() => setToggleModal(false)}>
        <ModalHeader toggle={() => setToggleModal(false)} className="font--secondary">Change value</ModalHeader>
        <ModalBody className="font--secondary">
          <p>Please enter a new value.</p>
          <input onChange={e => handleOnChange(e)}></input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleOnSumbit()}>Submit</Button>{' '}
          <Button color="secondary" onClick={() => setToggleModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </p>
  );
};

BodyDatum.propTypes = {
  _id: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  datum: PropTypes.any,
  unit: PropTypes.any,
  canEdit: PropTypes.bool.isRequired,
  setCelestialBody: PropTypes.func.isRequired 
};

export default BodyDatum;
