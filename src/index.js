const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');  // Import des routes pour les tâches

const app = express();
const port = 3000;

app.use(express.json());  // Permet de lire le JSON dans les requêtes

// Connexion à MongoDB avec l'URL d'environnement
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todolist';  // Par défaut, localhost

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Utilisation des routes pour les tâches
app.use('/tasks', taskRoutes);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
