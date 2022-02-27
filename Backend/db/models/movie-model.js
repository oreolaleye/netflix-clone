const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    synopsis: {type: String, required: false},
    cast: {type: String, required: false},
    genre: {type: String, required: false},
    category: {type: String, required: false},
    rating: {type: String, required: false},
    year: {type: Number, required: false},
    duration: {type: String, required: false},
    smallImage: {type: String, required: false},
    bannerImage: {type: String, required: false},
    video: {type: String, required: false}
})

module.exports = mongoose.model("Movie", movieSchema);
