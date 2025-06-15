// Charger les variables d'environnement depuis le fichier .env en développement
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

// Initialiser l'application Express
const app = express();
const port = process.env.PORT || 3000;

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Récupérer l'URL du backend depuis les variables d'environnement
// avec une valeur par défaut si la variable n'est pas définie
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

// Route principale
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${backendUrl}/api/article`);
    res.render('index', { 
      title: response.data.titre || 'Titre par défaut', 
      content: response.data.contenu || 'Contenu par défaut'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
    res.render('index', { 
      title: 'Erreur de connexion', 
      content: 'Impossible de récupérer les données du backend.'
    });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur frontend démarré sur http://localhost:${port}`);
  console.log(`Connecté au backend sur ${backendUrl}`);
});
