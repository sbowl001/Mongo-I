const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const mongoose = require('mongoose');

mongoose 
  .connect('mongodb://localhost/friendsdb')  //did I have to write friendsdb by myself?
  .then(mongo => {
    console.log('connected to database');
  })
  .catch( err => {
    console.log('error connecting to the database', err)
  });

const friendController = require('./friends/friendController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
