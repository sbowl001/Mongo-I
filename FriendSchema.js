const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/friends")

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to friends database")
});

const definition = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const options = {
    timestamps: true
}

var friendSchema = new mongoose.Schema(definition, options)

var Friends = mongoose.Model('Friend', friendSchema, 'friends')

module.exports = Friends