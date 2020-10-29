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
//关联
schema.virtual('children',{
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('songList',{
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Song'
})

//导出
module.exports = mongoose.model('Category',schema)