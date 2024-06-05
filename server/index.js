const express = require('express');
const cors = require('cors');
const userRoutes = require('./public/routes/userRoutes');
const reservationRoutes = require('./public/routes/reservationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
