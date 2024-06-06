const express = require('express');
require('dotenv').config();
const Router = require('./src/routes/app.routes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(Router);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});