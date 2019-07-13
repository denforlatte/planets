// Set env variables
require('dotenv').config();

const express = require('express');
const connectToDatabase = require('./database');

// Initialise express with JSON parser
const app = express();
app.use(express.json({extended: false}));

// Connect to database
connectToDatabase();

// Server actions
app.get('/', (req, res) => res.send('API online.'));

// @NOTE  Added routes now in case more functionality needs to be added later.
app.use('/celestial_body', require('./routes/celestial_body'));

// If .PORT (production) doesn't exist, use the local .env's port
const PORT = process.env.PORT || process.env.DEV_SERVER_PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));