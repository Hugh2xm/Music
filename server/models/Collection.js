const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    CImg: { type: String },
    download : { type: Array },
    introduction: { type: String },
    songs: [{
        name: { type: String },
        url: { type: String }
    }]
})

module.exports = mongoose.model('Collection',schema)