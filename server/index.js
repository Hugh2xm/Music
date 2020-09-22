const express = require('express')

const app = express()

//跨域模块
app.use(require('cors')())
//处理数据req.body
app.use(express.json())
//静态文件托管
app.use('/uploads',express.static(__dirname+'/uploads'))


//数据库
require('./plugins/db')(app)
//路由
require('./routes/admin')(app)

app.listen(3000, ()=> {
    console.log('http:/localhost:3000')
})