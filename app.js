const express = require('express');

//Init express app
const app = express();

//Enable JSON incoming data
app.use(express.json());

exports.module = { app };
