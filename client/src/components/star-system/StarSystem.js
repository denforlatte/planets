import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

import SelectBody from '../layout/SelectBody';
import ClickableBody from './ClickableBody';

const StarSystem = props => {
  const [celestialBodies, setCelestialBodies] = useState([]);
  const refMain = useRef(null);

  useEffect(() =>{
    axios.get(`/star_system`)
    .then(res => setCelestialBodies(res.data));
  }, []);

  // Find width of container and divide it up to space out bodies.
  let horizontalStep = 0;
  if (refMain.current && refMain.current.getBoundingClientRect().width) {
    let containerWdith = refMain.current.getBoundingClientRect().width;
    horizontalStep = calcBodyHorizontalStep(containerWdith, celestialBodies.length);
  }

  // If the celestial bodies have been fetched, calculate the range of the diameters for ClickableBody scaling
  let minDiameter;
  let maxDiameter;
  if (celestialBodies.length > 0) {
    minDiameter = Math.min.apply(Math, celestialBodies.map(body => body.diameter));
    maxDiameter = Math.max.apply(Math, celestialBodies.map(body => body.diameter));
  }

  return (
    <>
      <SelectBody celestialBodies={celestialBodies}/>
      <main className="celestial-container">
        <ol ref={refMain} className="celestial-list">
          {celestialBodies.map((body, i) => (
            <ClickableBody key={body._id} celestialBody={body} height={calcClickableBodyHeight(body.diameter, minDiameter, maxDiameter)} paddingLeft={horizontalStep * i}/>
          ))}
        </ol>
        <p>*not to scale</p>
      </main>
    </>
  )
}

// Calculate the distance between the bodies required to spread them out.
export const calcBodyHorizontalStep = (containerWidth, numberOfBodies) => {
  let adjustedWidth = containerWidth - 300;
  let horizontalStep = adjustedWidth / (numberOfBodies - 1);
  return horizontalStep;
}

export const calcClickableBodyHeight = (diameter, minDiameter, maxDiameter) => {
  //    To show the bodies to scale would be impossible but I can still clue the user into the sizes
  // of bodies compared to other bodies (eg. "Jupiter is larger than Earth"). I set a min and max img
  // height and scale the bodies between those.

  // These variables are here because the app is small and they are important to the maths:
  const minHeight = 60;     // Minimum pixel height of a body
  const maxHeight = 250;    // Maximum pixel height of a body
  const scaleDampening = 4; // Increase dampening to decrease the effect of the scaling

  const scaleRange = maxHeight - minHeight;

  // Compare this body to the largest body in the solar system.
  // The Math.pow nth roots to reduce the difference and bring the heights closer together otherwise
  // the sun would be huge and everything else small.
  const scaleRatio = Math.pow( (diameter - minDiameter) / (maxDiameter - minDiameter), 1 / scaleDampening );

  // Apply this to the constraints and return
  let psuedoRelativeHeight = minHeight + (scaleRange * scaleRatio);
  return psuedoRelativeHeight;
}

export default StarSystem
