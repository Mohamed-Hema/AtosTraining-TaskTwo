const express = require('express');
const app = express();
const axios = require('axios');
const questionsRouter = require('./routes/questionRoutes');

app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
