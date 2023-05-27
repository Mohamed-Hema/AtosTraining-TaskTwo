const express = require('express');
const app = express();
const userRoutes = require('./routes/routes');
const port = 4000;

// const keycloak = require('keycloak-connect');
// const dbConfig = require('./db/config');

app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Keycloak setup
// const kcConfig = require('./config/keycloak.json');
// const keycloakInstance = new keycloak({ store: keycloakConfig });

// PostgreSQL setup
// const pool = new pg.Pool(dbConfig);

// Middleware setup
// app.use(keycloakInstance.middleware());

// Define routes
// ...

// Start the server
