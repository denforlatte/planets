// Set env variables
require('dotenv').config();

const express = require('express');
const connectToDatabase = require('./database');
const path = require('path');

// Initialise express with JSON parser
const app = express();
app.use(express.json({extended: false}));

// Connect to database
connectToDatabase();

// Server actions
// @NOTE  Added routes now in case more functionality needs to be added later.
app.use('/celestial_body', require('./routes/celestial_body'));
app.use('/star_system', require('./routes/star_system'));
app.use('/authentication', require('./routes/authentication'));
app.use('/images', express.static('public'));

// Serve client files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// If .PORT (production) doesn't exist, use the local .env's port
const PORT = process.env.PORT || process.env.DEV_SERVER_PORT;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));