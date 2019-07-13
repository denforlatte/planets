const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CelestialBodySchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 60
  },
  distance_sun: {
    type: Number
  },
  mass: {
    type: Number,
    required: true
  },
  diameter: {
    type: Number,
    required: true
  },
  density: {
    type: Number,
    required: true
  },
  surface_gravity: {
    type: Number,
    required: true
  },
  number_of_moons: {
    type: Number,
    required: true
  },
  interesting_facts: {
    type: [String],
    max: 500
  }
})

module.exports = CelestialBodySchema = mongoose.model('celestial_bodies', CelestialBodySchema);