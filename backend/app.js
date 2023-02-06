const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user');

mongoose.connect('mongodb+srv://nana4502:nana@cluster0.xsijvok.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  mongoose.set('strictQuery', false);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json());
//app.use(express.json());

//app.use('/api/auth', userRoutes);
app.use('/api', userRoutes);

module.exports = app;

// Configuration pour servir des fichiers statiques
app.use(express.static(__dirname + '/frontend'));

// Définition d'une route pour afficher la page HTML
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Démarrage du serveur sur le port 3000
app.listen(3100, function() {
  console.log('Serveur démarré sur le port 3000');
});
