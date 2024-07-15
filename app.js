const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const Favorites = require('./models/User');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
});

app.post('/api/favorites', async (req, res) => {
    const { baseCurrency, targetCurrency } = req.body;
    try {
        await Favorites.create({ baseCurrency, targetCurrency });
        res.status(201).send('Favorite saved');
    } catch (error) {
        console.error('Error saving favorite:', error);
        res.status(500).send('Error saving favorite');
    }
});

app.get('/api/favorites', (req, res) => {
    Favorites.findAll()
      .then(fav => res.json(fav))
      .catch(error => {
        console.error('Error fetching favorites:', error);
        res.status(500).send('Error fetching favorites');
      })
})

// Sync database and start the server
const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
