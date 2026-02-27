import express from 'express';
import clipboardRouter from './routes/clipboard.js';
import healthcheckRouter from './routes/healthcheck.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer req.body
app.use(express.json());

// Liste des routes
app.use('/api', healthcheckRouter);
app.use('/api', clipboardRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});