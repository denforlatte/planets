const express = require('express');
const router = express.Router();

// Models
const CelestialBody = require('../models/CelestialBody');

// @ROUTE   GET /star_system
// @DESC    Get all celestial bodies in "solar_system"
// @ACCESS  Public
// @NOTE    This would need some rewriting to add support for multiple star systems but the structure is there
router.get('/', async (req, res) => {
  try {
    // @NOTE  Sorting by distance might be useful later, if I choose to auto-populate a list on the frontend.
    const celestial_bodies = await CelestialBody.find({star_system: 'solar_system'}).sort({distance_sun: 1});
    res.json(celestial_bodies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;