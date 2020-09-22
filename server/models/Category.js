//引入mongoose
const mongoose = require('mongoose')

//建立模型
const schema = new mongoose.Schema({
    name: { type: String },
    child: { type: Array }
})

//导出
module.exports = mongoose.model('Category',schema)