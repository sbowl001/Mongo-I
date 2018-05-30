const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Friend = require('./FriendSchema');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api/friends', (req, res) => {
  const friends = Friend.find({}, (err, friends) => {
    if (err) {
      res.status(500).json({ error: "Something went wrong. Please try again later."})
    }
    res.status(200).json(friends);
  })
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

const post = function(req, res) {
  const friend = new Friend(req.body)
  friend.save().then(newFriend => {
    res.status(201).json(newFriend)
  }).catch(error => {
    console.log(error.message)
  })
}

server.post('/api/friends', post)