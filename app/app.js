// app.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Wiz Code Demo!</h1><p>This is a simple Node.js app served with Docker</p>');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
