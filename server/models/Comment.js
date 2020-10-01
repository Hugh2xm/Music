const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    songs: { type: mongoose.SchemaTypes.ObjectId, ref: 'Song'},
    upload: { type: String },
    // upload: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' }]
    content: { type: String }
})

module.exports = mongoose.model('Comment',schema)