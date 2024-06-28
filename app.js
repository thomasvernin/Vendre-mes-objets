const express = require('express');
const mongoose = require('mongoose'); 
const app = express();

const Thing = require('./models/thing');


mongoose.connect('mongodb+srv://tvernin49100:tvernin49100@thomasvernin.d5v4iay.mongodb.net/?retryWrites=true&w=majority&appName=Thomasvernin', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });


    app.use('/api/stuff', (req, res, next) => {
        Thing.find()
          .then(things => res.status(200).json(things))
          .catch(error => res.status(400).json({ error }));
        }); 


module.exports = app;

