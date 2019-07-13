const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

router.post('/', [
  check('password', 'Password required').exists()
], async (req, res) => {
  // Check a password was sent
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  // If password is incorrect, return.
  if (req.body.password !== process.env.PASSWORD) {
    return res.status(400).json({msg: "Incorrect password"});
  }

  // Create and send JSON web token
  try {
    const payload = {
      canEdit: true
    };

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60}, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;