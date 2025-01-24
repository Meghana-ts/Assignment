const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./database');
const Spreadsheet = require('./models/Spreadsheet');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Sync Database
sequelize.sync({ force: false })
  .then(() => console.log('Database Synced'))
  .catch((err) => console.error('Database Sync Error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Spreadsheet Clone Backend with MySQL' });
});

app.post('/spreadsheet', async (req, res) => {
  try {
    const { name, ownerId, cells } = req.body;
    const spreadsheet = await Spreadsheet.create({ name, ownerId, cells });
    res.status(201).json(spreadsheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/spreadsheet/:id', async (req, res) => {
  try {
    const spreadsheet = await Spreadsheet.findByPk(req.params.id);
    if (spreadsheet) {
      res.json(spreadsheet);
    } else {
      res.status(404).json({ error: 'Spreadsheet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Routes (For Example)
app.post('/user', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
