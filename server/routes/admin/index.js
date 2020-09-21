module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    //创建数据
     router.post('/categories',async (req,res) => {
         const model = await Category.create(req.body)
         res.send(model)
    })

    //列表数据
    router.get('/categories',async (req,res) => {
        const items = await Category.find().limit()
        res.send(items)
    })

    //编辑数据
    router.get('/categories/:id',async (req,res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    //数据修改
    router.put('/categories/:id',async (req,res)=> {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //子路由
    app.use('/admin/api',router)
}