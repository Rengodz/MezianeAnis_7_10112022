const express = require('express');
const bp = require('body-parser');
require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const userRoutes = require('./routes/user');
const topicRoutes = require('./routes/topic');

const app = express();

const upload = require('./multerconfig');

app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/api/topics', upload.single('imageUrl'), topicRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;