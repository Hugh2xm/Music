module.exports = app => {
    //引用数据库
    const mongoose = require("mongoose")

    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-music', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
    })

    require('require-all')(__dirname + '/../models')
}