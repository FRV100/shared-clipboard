const express = require('express');
const router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.json({ message: 'Server is up' });
});

module.exports = router;
