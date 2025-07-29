const express = require('express');
const Task = require('../models/task');  // Import du modèle Task
const router = express.Router();

// Route pour créer une tâche
router.post('/', async (req, res) => {
  const { title, description, completed } = req.body;  // On récupère le titre, la description et le statut 'completed'

  try {
    const newTask = new Task({
      title,
      description,
      completed: completed || false,  // Si 'completed' est donné, on l'utilise, sinon on met false par défaut
    });
    await newTask.save();
    res.status(201).json(newTask);  // Renvoie la tâche créée
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la tâche', error: error.message });
  }
});

// Route pour récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();  // Trouve toutes les tâches dans la base
    res.status(200).json(tasks);  // Renvoie toutes les tâches
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: error.message });
  }
});

// Route pour récupérer une tâche par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche', error: error.message });
  }
});

// Route pour modifier une tâche par son ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;  // Récupère les données envoyées par le client

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, updatedAt: Date.now() },
      { new: true }  // On renvoie la tâche mise à jour
    );
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);  // Renvoie la tâche mise à jour
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la tâche', error: error.message });
  }
});

// Route pour supprimer une tâche par son ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: error.message });
  }
});

module.exports = router;
