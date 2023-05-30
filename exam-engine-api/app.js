const express = require('express');
const app = express();
const axios = require('axios');
const routes = require('./routes/routes');
const connectDB = require("./db/questionsDB")

app.use(express.json());

app.use('/api', routes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
