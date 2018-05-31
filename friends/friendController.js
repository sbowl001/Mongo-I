const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({
                    error: 'Error getting friends'
                });
            })
    })
    .post((req, res) => {
        const friendData = req.body;
        const friend = new Friend(friendData);
        friend.save()
            .then(friend => {
                res.status(201).json(friend);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    });

    module.exports = router;