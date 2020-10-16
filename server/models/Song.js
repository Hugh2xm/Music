const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    download: { type: Number },
    url: { type: String },
    upload: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' }
})

module.exports = mongoose.model('Song',schema)