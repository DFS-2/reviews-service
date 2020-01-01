const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./controllers/postgresController.js');

const port = 3004;

const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:hostId', express.static(path.join(__dirname, '../public')));

app.get('/api/reviews', (req, res) => {
  controller.reviews.get(req, res);
  // console.log('Successful GET Request');
  // res.send('Successful GET Request');
});

app.get('/api/reviews/:hostId', (req, res) => {
  controller.reviews.get(req, res);
  // console.log('Successful GET Request');
  // res.send('Successful GET Request');
});

app.post('/api/reviews/:hostId', (req, res) => {
  console.log('Successful POST Request');
  res.send('Successful POST Request');
});

app.put('/api/reviews/:hostId', (req, res) => {
  console.log('Successful PUT Request');
  res.send('Successful PUT Request');
});

app.delete('/api/reviews/:hostId', (req, res) => {
  console.log('Successful DELETE Request');
  res.send('Successful DELETE Request');
});

app.listen(port, () => {
  console.log(`we be arriving at port ${port}`);
});
