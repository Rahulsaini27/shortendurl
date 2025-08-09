const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const urlApiRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes'); 
const { redirectToOriginalUrl } = require('./controllers/urlController');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.get('/', (req, res) => {
  res.send('Your server is live');
});

app.use('/api', urlApiRoutes);
app.use('/api/auth', authRoutes); 

app.get('/:shortcode', redirectToOriginalUrl);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;