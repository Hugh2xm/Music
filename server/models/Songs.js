const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    introduction: { type: String },
    download: { type: Number },
    // upload: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' }]
})

module.exports = mongoose.model('Songs',schema)