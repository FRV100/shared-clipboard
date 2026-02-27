import db from '../db.js';
import express from 'express';

const router = express.Router();

router.get('/clipboard', (req, res) => {
  const row = db.query(`
    SELECT content
    FROM clipboard
    WHERE id = 1
  `).get();
  res.json({ content: row.content });
});

router.post('/clipboard', (req, res) => {
  const { content } = req.body;
  db.query(`
    UPDATE clipboard
    SET content = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `).run(content);
  res.json({ message: 'Copied to clipboard' });
});


export default router;
