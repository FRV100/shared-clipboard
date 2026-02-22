const express = require('express');
const healthcheckRouter = require('./routes/healthcheck');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', healthcheckRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});