module.exports = app => {
    const express = require('express')

    const router = express.Router({
        mergeParams: true
    })

    //创建数据
     router.post('/',async (req,res) => {
         const model = await req.Model.create(req.body)
         res.send(model)
    })

    //列表数据
    //populate的意思是我不只是要这个字段的ID，我要的是整个对象里面的信息
    // find({"parent":{"$exists":false}})
    router.get('/',async (req,res)=> {
        const queryOptions = {}
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit()
        res.send(items)
    })

    //编辑数据
    router.get('/:id',async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //数据修改
    router.put('/:id',async (req,res)=> {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除数据
    router.delete('/:id',async (req,res)=> {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    //子路由
    app.use('/admin/api/rest/:resource',async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)


    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads/ad'})
    //上传图片
    app.post('/admin/api/upload', upload.single('file'),async (req,res)=> {
        const file = req.file
        file.url = `http://localhost:3000/uploads/ad/${file.filename}`
        res.send(file)
    })
}