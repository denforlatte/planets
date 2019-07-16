import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const InterestingFacts = ({_id, interesting_facts, canEdit, setCelestialBody}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [input, setInput] = useState('');

  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  // Send the input to the toggle edit, wipe the input, close the modal
  const handleOnSumbit = () => {
    addFact(input);
    setInput('');
    setToggleModal(false);
  };

  const addFact = (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body = JSON.stringify({fact: value});

    axios.post(`/celestial_body/${_id}/facts`, body, config)
    .then(res => setCelestialBody(res.data));
  }

  const removeFact = index => {
    axios.delete(`/celestial_body/${_id}/facts/${index}`)
    .then(res => setCelestialBody(res.data));
  }

  return (
    <>
      {(interesting_facts.length > 0 || canEdit) && (
        <>
          <section className="interestingfacts">
            <h3>Interesting Facts</h3>
            {interesting_facts.map((fact, i) => (
              <p key={'fact_' + i}>{fact}{' '}{canEdit && <i className="hover fas fa-trash-alt" onClick={() => removeFact(i)}></i>}</p>
            ))}
            {canEdit && <Button onClick={() => setToggleModal(true)}>Add Fact</Button>}
          </section>

          <Modal isOpen={toggleModal} toggle={() => setToggleModal(false)}>
            <ModalHeader toggle={() => setToggleModal(false)} className="font--secondary">Add fact</ModalHeader>
            <ModalBody className="font--secondary">
              <p>Please enter a new fact.</p>
              <input onChange={e => handleOnChange(e)}></input>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleOnSumbit()}>Submit</Button>{' '}
              <Button color="secondary" onClick={() => setToggleModal(false)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  )
};

InterestingFacts.propTypes = {
  _id: PropTypes.string.isRequired,
  interesting_facts: PropTypes.array.isRequired,
  canEdit: PropTypes.bool.isRequired,
  setCelestialBody: PropTypes.func.isRequired
};

export default InterestingFacts;
