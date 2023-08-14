const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

const apiRouter = require('./routes/apiRouter');

app.use(cors())
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

app.use(apiRouter)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
