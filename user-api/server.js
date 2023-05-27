const express = require('express');
const app = express();
const userRoutes = require('./routes/routes');
const port = 4000;
const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({
  // Keycloak configuration options
  clientId: 'myclient',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/',
  realm: 'examengine',
});


app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
