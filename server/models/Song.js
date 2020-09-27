const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    parent: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    introduction: { type: String },
    download: { type: Number },
    url: { type: String },
    // upload: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' }]
})

module.exports = mongoose.model('Song',schema)