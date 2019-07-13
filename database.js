const mongoose = require('mongoose');

const connectToDatabase = async (dbURI = process.env.MONGO_URI) => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(dbURI, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
    console.log('MongoDB connected.');
  } catch(error) {
    console.error(error.message);
  }
}

module.exports = connectToDatabase;