const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    userId: { type: String, required: true },
    email: {type: String, required: true},
    topicText: { type: String, required: true },
    imageUrl: { type: String, required: false },
    comments: { type: Array, required: false },
    likes: { type: Number, required: false, default: 0},
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
    creationDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('topic', topicSchema);
