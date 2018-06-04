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
                    errorMessage: "The friends information could not be retrieved." 
                });
            })
    })
    .post((req, res) => {
        const friendData = req.body;
        const friend = new Friend(friendData);

        if(!friendData.firstName || !friendData.lastName || friendData.age === undefined){
                res.status(400).json( {errorMessage: "Please provide firstName, lastName and age for the friend."});
                return
            }
        friend.save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch( err => {
            console.log(err.errors)
            if(err.errors.age){
                res.status(400).json({errorMessage: "Age must be a number between 1 and 120"})
            } else {
                res.status(500).json({errorMessage: "There was an error while saving the friend to the database."})
            }
        })
        // if(!friendData.firstName || !friendData.lastName || !friendData.age){
        //     res.status(400).json( {errorMessage: "Please provide firstName, lastName and age for the friend."});
        // }

        // if ( isNaN(Number(friendData.age)) || friendData.age < 1 || friendData.age > 120){
        //     res.status(400).json({errorMessage: "Age must be a number between 1 and 120"});
        // } else {
        // friend.save()
        //     .then(friend => {
        //         res.status(201).json(friend);
        //     })
        //     .catch( err => {
        //         res.status(500).json({errorMessage: "There was an error while saving the friend to the database."});
        //     })
        // }
    });
     
 

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        //ID 
        Friend.findById(id)
        .then( friend => {
            console.log(friend)
        if(friend !== null) {
            res.status(200).json(friend)
        } else {
           res.status(404).json( {message: "The friend with the specified ID does not exist."});
        
        }
    })
        .catch( err => {          
            res.status(500).json({errorMessage: "The friend information could not be retrieved."});
        })
    })
    .delete((req, res) => {
        const {id} = req.params;
        Friend.findByIdAndRemove(id)
            .then(friend => {
                if( friend === null) {
            res.status(404).json( {message: "The friend with the specified ID does not exist."});
                } else {
                res.status(200).json(friend);
                }
            })
            .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }));
    })
    .put((req, res) => {
        const {id} = req.params;
        const friendData = req.body;
        const options = {
            new: true
        }
        Friend.findByIdAndUpdate(id, friendData, options)
            .then(friend => {
                if (friend === null) {
                    res.sendStatus(404);
                } else {
                    res.status(200).json(friend);
                }
            })
            .catch(err => res.status(500).json({errorMessage: "The friend chould not be updated"}))
    });

module.exports = router;