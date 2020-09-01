const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    visitorIn: {
        type: Number,
        required: true
    },
    visitorOut: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;