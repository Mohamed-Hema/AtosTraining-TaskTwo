const express = require('express');
const app = express();
const axios = require('axios');
const routes = require('./routes/Routes');
var cors = require('cors')

app.use(express.json());
app.use(cors())

app.use('/api', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
