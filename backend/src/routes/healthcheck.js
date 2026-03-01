import express from 'express';

const router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.json({ message: 'Server is up' });
});

export default router;
