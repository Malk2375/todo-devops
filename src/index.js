const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté avec succès'))
  .catch((err) => console.error('Erreur de connexion à MongoDB', err));

app.get('/', (req, res) => res.json({ message: 'Bonjouuuur :)' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application en écoute sur http://localhost:${port}`);
});
