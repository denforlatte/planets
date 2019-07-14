const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CelestialBodySchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 60
  },
  type: {
    type: String,
    required: true,
    max: 60
  },
  image_path: {
    type: String,
    max:60
  },
  star_system: { // @NOTE  This allows for other stellar systems to be added, and they could have a collection, making this a reference.
    type: String,
    default: "solar_system",
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
  interesting_facts: { // @NOTE For flexibility, additional facts can be added and iterated through by the client.
    type: [String],
    max: 500
  }
})

module.exports = CelestialBody = mongoose.model('celestial_bodies', CelestialBodySchema);