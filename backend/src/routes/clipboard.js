import express from 'express';
import { WebSocket } from 'ws';
import db from '../db.js';
import { wss } from '../ws.js';

const router = express.Router();

router.get('/clipboard', (req, res) => {
  try {
    const row = db.query(`
      SELECT content
      FROM clipboard
      WHERE id = 1
    `).get();
    res.json({ content: row.content });
  } catch (err) {
    res.status(500).json({ error: 'Error while reading' });
  }
});

router.post('/clipboard', (req, res) => {
  const { content } = req.body;
  if (content === undefined) {
    return res.status(400).json({ error: 'Field content is required' });
  }
  try {
    db.query(`
      UPDATE clipboard
      SET content = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(content);
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ content }));
      }
    }
    res.json({ message: 'Copied to clipboard' });
  } catch (err) {
    res.status(500).json({ error: 'Error while writing' });
  }
});


export default router;
