const dotenv = require("dotenv");
const express = require("express");

(async function () {
  dotenv.config();

  const PORT = 3000;
  const app = express();
  const server = app.listen(PORT, () =>
    console.log(`Backend started on port ${PORT}`)
  );

  // Middleware function for "/documents" endpoint
  app.use("/documents", (req, res) => {
    // Handle the request and send a response
    res.send("Documents endpoint");
  });
})();
