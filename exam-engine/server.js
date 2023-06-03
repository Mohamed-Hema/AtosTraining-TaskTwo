const express = require('express');
const app = express();
const examRoutes = require('./routes/routes');
const port = 5000;
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use('/api', examRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  