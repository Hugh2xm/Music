const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    categories: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    url: { type: String },
    upload: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    mask: {type: Number},
    createTime: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('UpSong',schema,'UpSong')