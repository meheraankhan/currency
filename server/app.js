const express = require('express');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const registerRoute = require('./register/register');
const loginRoute = require('./login/login.');
const homeGetRoute = require('./home/homeGet');
const homeAddRoute = require('./home/homeAdd');
const homeRemoveRoute = require('./home/homeRemove');
const accountGetRoute = require('./account/accountGet');
const accountUpdateRoute = require('./account/accountUpdate');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example API Route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Vacation Recommender API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const corsOptions = {
    origin: 'http://localhost:3000', // React app's URL
    credentials: true, // Allow cookies
};
  
app.use(cors(corsOptions));

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/home/get', homeGetRoute);
app.use('/api/home/add', homeAddRoute);
app.use('/api/home/remove', homeRemoveRoute);
app.use('/api/account/get', accountGetRoute);
app.use('/api/account/update', accountUpdateRoute);