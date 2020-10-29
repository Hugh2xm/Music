module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const fs = require('fs')

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
        } else if(req.Model.modelName === 'Song') {
            queryOptions.populate = 'upload'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit()
        res.send(items)
    })

    router.get('/name',async (req,res)=> {
        const items = await req.Model.find().populate('songs').limit()
        res.send(items)
    })

    //编辑数据
    router.get('/:id',async (req,res) => {
        const queryOptions = {}
        if(req.Model.modelName === 'Song') {
            queryOptions.populate = 'upload'
        }
        const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
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

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    //子路由
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)


    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads/ad'})
    //上传图片
    app.post('/admin/api/upload',authMiddleware(), upload.single('file'),async (req,res)=> {
        const file = req.file
        file.url = `http://localhost:3000/uploads/ad/${file.filename}`
        res.send(file)
    })
    //上传音乐
    const upload1 = multer({dest: __dirname + '/../../uploads/music'})
    app.post('/admin/api/uploadM',authMiddleware(), upload1.single('file'),async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/music/${file.originalname}`
        fs.renameSync('./uploads/music/' + file.filename, './uploads/music/' + file.originalname);
        res.send(file)
    })



    //登录的路由
    app.post('/admin/api/login', async (req, res) => {
        //结构传递过来的用户名和密码
        const { username, password } = req.body
        //1根据用户名找用户（只能通过用户名找用户，密码是被散列加载的）

        //设置数据库的时候，adminUser的密码是搜索不到的
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user,422,'用户不存在')
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        //2验证密码，因为是用bcrypt加密的所以也要通过其解密
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid,422,'密码错误')
        // if(!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        //返回token

        //生成token
        const token = jwt.sign({id: user._id},app.get('secret'))
        res.send({token})
    })

    //错误处理函数
    app.use(async (err,req,res,next)=> {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}