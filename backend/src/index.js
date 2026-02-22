import express from 'express';
import healthcheckRouter from './routes/healthcheck.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', healthcheckRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});