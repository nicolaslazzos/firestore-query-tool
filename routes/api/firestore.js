const express = require('express');
const firebase = require('firebase');

const router = express.Router();

// @route   POST api/firestore/
// @desc    test route
// @access  public
router.post('/', (req, res) => {
  console.log(req.body);

  res.send('ok')
});

module.exports = router;