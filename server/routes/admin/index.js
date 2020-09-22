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
    //populate的意思是我不只是要这个字段的ID，我要的是整个对象里面的信息
    router.get('/categories',async (req,res) => {
        const items = await Category.find().populate('parent').limit()
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

    //删除数据
    router.delete('/categories/:id',async (req,res)=> {
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    //子路由
    app.use('/admin/api',router)
}