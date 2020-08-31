const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;