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
        
        if(!friendData.firstName || !friendData.lastName || !friendData.age){
            res.status(400).json( {errorMessage: "Please provide firstName, lastName and age for the friend."});
        }

        if ( isNaN(Number(friendData.age)) || friendData.age < 1 || friendData.age > 120){
            res.status(400).json({errorMessage: "Age must be a number between 1 and 120"});
        } else {
        friend.save()
            .then(friend => {
                res.status(201).json(friend);
            })
            // .catch(err => {
            //     res.status(400).json( {errorMessage: "Please provide firstName, lastName and age for the friend."})
            // });
        }
    });
     


    // .then(friend => {
    //     if (friend !== null) {
    //         res.status(200).json(friend);
    //     } else {
    //         res.sendStatus(404);
    //     }
    // })
    // .catch(err => res.status(500).json(err))

router
    .route('/:id')
    .get((req, res) => {
        const {
            id
        } = req.params;
        Friend.findById(id)
        res.status(200).json({
            route: '/api/friends/' + req.params.id
        });
    })
    .delete((req, res) => {
        const {id} = req.params;
        Friend.findByIdAndRemove(id)
            .then(friend => {
                res.status(200).json(friend);
            })
            .catch(err => res.status(500).json(err));
    })
    .put((req, res) => {
        const {id} = req.params;
        const friendData = req.body;
        const options = {
            new: true
        }
        Friend.findByIdAndUpdate(id, friendData, options)
            .then(friend => {
                if (friend !== null) {
                    res.status(200).json(friend);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(err => res.status(500).json(err))
    });

module.exports = router;