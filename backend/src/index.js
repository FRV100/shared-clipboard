import { createServer } from 'http';
import express from 'express';
import clipboardRouter from './routes/clipboard.js';
import healthcheckRouter from './routes/healthcheck.js';
import { wss } from './ws.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer req.body
app.use(express.json());

// Liste des routes
app.use('/api', healthcheckRouter);
app.use('/api', clipboardRouter);

// Démarrage du serveur
const server = createServer(app);

server.on('upgrade', (req, socket, head) => {    // ← gère le handshake WS
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

wss.on('connection', (ws) => {          // ← log de connexion/déconnexion
  console.log('Client WS connected');
  ws.on('close', () => console.log('Client WS disconnected'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});