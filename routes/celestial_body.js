const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Models
const CelestialBody = require('../models/CelestialBody');

// @ROUTE   POST /celestial_body
// @DESC    Add a new celestial body. Not yet used on frontend but useful for testing and adding the first bodies.
// @ACCESS  Private

// @TODO    Add auth
router.post('/', [[
  // Additional validation on top of frontend validation for more flexibility and reliability
  check('name', 'Name is required').not().isEmpty(),
  check('mass', 'Mass is required').not().isEmpty(),
  check('diameter', 'Diameter is required').not().isEmpty(),
  check('density', 'Density is required').not().isEmpty(),
  check('surface_gravity', 'Gravity is required').not().isEmpty(),
  check('number_of_moons', 'Moons is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  
  // Create new object from req and save to collection.
  try {
    const { name, star_system, distance_sun, mass, diameter, density, surface_gravity, number_of_moons, interesting_facts } = req.body;

    // Create an intermediate object in case optional inputs are not sent.
    let celestialBodyFields = {
      name,
      mass,
      diameter,
      density,
      surface_gravity,
      number_of_moons
    }

    if (star_system) celestialBodyFields.star_system = star_system;
    if (distance_sun) celestialBodyFields.distance_sun = distance_sun;
    if (interesting_facts) celestialBodyFields.interesting_facts = interesting_facts;

    const newCelestialBody = new CelestialBody(celestialBodyFields);
    const celestialBody = await newCelestialBody.save();

    res.json(celestialBody);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;