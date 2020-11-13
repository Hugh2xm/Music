module.exports = app => {
    const mongoose = require('mongoose')
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const UpSong = require('../../models/UpSong')
    const Category = require('../../models/Category')
    const Song = require('../../models/Song')
    let ObjectId = mongoose.Types.ObjectId;
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
        } else if(req.Model.modelName === 'UpSong') {
            queryOptions.populate = 'upload'
        }
        const items = await req.Model.find().setOptions(queryOptions).lean()
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
            const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
            res.send(model)
        } else if(req.Model.modelName === 'UpSong') {
            const model = await UpSong.findById(req.params.id).populate('upload').populate('categories').lean()
            res.send(model)
        } else {
            const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
            res.send(model)
        }

    })


    //查询数据-数据可视化
    app.get('/admin/api/rest/dataShow',async (req,res)=> {

        const parent = await Category.findOne({
            name: '音效'
        })

        const children = await Category.find({
            parent: parent._id
        })

        let son = []
        for (let i = 0;i<children.length;i++) {
            let temp = await Category.find({
                parent: children[i]._id
            })
            for (let j = 0; j < temp.length; j++) {
                son.push(temp[j])
            }
        }

        let listSon = []
        for (let i = 0; i < son.length; i++) {
            let temp = await Category.find({
                parent: son[i]._id
            })
            for (let j = 0; j < temp.length; j++) {
                listSon.push(temp[j])
            }
        }

        let listHot = []

        for (let i = 0; i < listSon.length; i++) {
            const list = await Category.aggregate([
                {
                    $lookup: {
                        from: 'Songs',
                        localField: '_id',
                        foreignField: 'categories',
                        as: 'songList'
                    }
                },
                {
                    $match: {  "_id":new ObjectId(listSon[i]._id) }
                }
            ])
            listHot.push(list[0])
        }

        listHot.map(item => {
            let total = 0;
            item.songList.map( item=> {
                total+=item.download
            })
            item.numbers = total

            //添加虚拟下载数字
            if(item.numbers === 0) {
                item.numbers = Math.floor(Math.random() * 100000)
            }
        })

        //随机生成颜色
        // let getRandomColor = function(){
        //     return  '#' + (function(color){
        //         return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
        //         && (color.length === 6) ?  color : arguments.callee(color);
        //     })('');
        // }
        let colors = ['#da0d68', '#975e6d', '#e0719c', '#f99e1c', '#ef5a78', '#f7f1bd', '#da1d23', '#dd4c51', '#3e0317', '#e62969',
            '#6569b0', '#ef2d36', '#c94a44', '#b53b54', '#a5446f', '#dd4c51', '#f2684b', '#e73451', '#e65656', '#f89a1c', '#aeb92c',
            '#4eb849', '#f68a5c', '#baa635', '#f7a128', '#f26355', '#e2631e', '#fde404', '#7eb138', '#ebb40f', '#e1c315', '#9ea718',
            '#94a76f', '#d0b24f', '#8eb646', '#faef07', '#c1ba07', '#b09733', '#8f1c53', '#b34039', '#ba9232', '#8b6439', '#187a2f',
            '#a2b029', '#718933', '#3aa255', '#a2bb2b', '#62aa3c', '#03a653', '#038549', '#28b44b', '#a3a830', '#7ac141', '#5e9a80',
            '#0aa3b5', '#9db2b7', '#8b8c90', '#beb276', '#744e03', '#a3a36f', '#c9b583', '#978847', '#9d977f', '#cc7b6a', '#db646a',
            '#76c0cb', '#80a89d', '#7a9bae', '#039fb8', '#5e777b', '#120c0c', '#c94930', '#caa465', '#dfbd7e', '#be8663', '#b9a449',
            '#899893', '#a1743b', '#894810', '#ddaf61', '#b7906f', '#eb9d5f', '#ad213e', '#794752', '#cc3d41', '#b14d57', '#c78936',
            '#8c292c', '#e5762e', '#a16c5a', '#a87b64', '#c78869', '#d4ad12', '#9d5433', '#c89f83', '#bb764c', '#692a19', '#470604',
            '#e65832', '#d45a59', '#310d0f', '#ae341f', '#d78823', '#da5c1f', '#f89a80', '#f37674', '#e75b68', '#d0545f']
        let getRandomColor = function() {
            let ran = Math.floor(Math.random()*colors.length)
            return colors.splice(ran,1)
        }

        let list = []
        for (let i = 0; i < son.length; i++) {
            let total = 0
            let arr = []
            for (let j = 0; j < listHot.length; j++) {
                if(son[i]._id.toString() === listHot[j].parent.toString()) {
                    total+=listHot[j].numbers
                    arr.push({
                        name: listHot[j].name,
                        value: listHot[j].numbers,
                        itemStyle: {
                            color: getRandomColor()
                        },
                    })
                }
            }
            list.push({
                name: son[i].name,
                parent: son[i].parent,
                value: total,
                itemStyle: {
                    color: getRandomColor()
                },
                children: arr
            })
        }

        let endList = []
        for (let i = 0; i < children.length; i++) {
            let totals = 0
            let arr = []
            for (let j = 0; j < list.length; j++) {
                if(children[i]._id.toString() === list[j].parent.toString()) {
                    totals+=list[j].value
                    arr.push(list[j])
                }
            }
            endList.push({
                name: children[i].name,
                itemStyle: {
                    color: getRandomColor()
                },
                children: arr
            })

        }

        //删除parent属性
        endList.map(item=> {
            item.children.map(temp=> {
                delete temp.parent
            })
        })



        res.send(endList)
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

    // 错误处理函数
    app.use(async (err,req,res,next)=> {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}