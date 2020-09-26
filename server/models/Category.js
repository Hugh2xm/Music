//引入mongoose
const mongoose = require('mongoose')

//建立模型
const schema = new mongoose.Schema({
    name: { type: String },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        //关联
        ref: 'Category'
    }
})

//导出
module.exports = mongoose.model('Category',schema)