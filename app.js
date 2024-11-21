const express = require('express');
const bodyParser = require('body-parser');
const poolRoutes = require('./routes/poolRoutes'); // Mengimpor router dari poolRoutes.js

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/pools', poolRoutes); // Semua operasi pada kolam renang berada di '/pools'

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
