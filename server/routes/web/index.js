module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    let ObjectId = mongoose.Types.ObjectId;
    const Category = mongoose.model('Category')
    const User = mongoose.model('User')
    const Song = mongoose.model('Song')
    const Ad = mongoose.model('Ad')
    const TSong = mongoose.model('TSong')

    //首页轮播图
    router.get('/home/pics',async (req,res)=> {
        const pic = await Ad.findOne({
            name: '首页'
        })
        res.send(pic)
    })

    //音效分类数据导入
    router.get('/category/init',async (req,res)=> {
        await Category.deleteMany({})
        //第一层
        const first = [{
            name: '音效'
        }]
        await Category.insertMany(first)

        const FParent = await Category.findOne({
            name: '音效'
        })

        const newsTitle  = {
            0: ["常用音效", "影视音效", "游戏音效"],

            //常用音效
            1: ["环境", "人声", "动物"],
            2: ["水","火","风","天气","人群"],
            3: ["笑声","鼓掌","对白"],
            4: ["兽","鸟","虫","鱼","龙"],

            //影视音效
            5: ["实用功能",  "气氛工具" , "乐器演奏"],
            6: ["转场",  "预告片" ],
            7: ["震撼",  "紧张" , "恐怖"],
            8: ["唢呐",  "小提请" , "钢琴"],

            //游戏音效
            9: ["人物", "怪物","战争"],
            10: ["人类","兽人","战斗","死亡"],
            11: ["远古巨兽","骷髅","狼人"],
            12: ["冷兵器","炮","战机"]
        }

        //第二层
        let two = []
        for (let i = 0; i < newsTitle[0].length; i++) {
            two.push({
                name: newsTitle[0][i],
                parent: FParent
            })
        }
        await Category.insertMany(two)
        //第三层
        const SParent = await Category.where({
            parent: FParent
        }).find().lean()


        let three = []
        let topParent=''
        for (let i = 1,k = 0; i < 13; i+=4,k++) {
            topParent = SParent[k]
            for (let j = 0; j < newsTitle[i].length; j++) {
                three.push({
                    name: newsTitle[i][j],
                    parent: topParent
                })
            }
        }
        await Category.insertMany(three)

        //第四层
        const TParent = await Category.where({
            parent: SParent
        }).find().lean()
        let Four = []
        let length = 0
        for (let i = 0; i < 9; i++) {
            topParent = TParent[i]
            if(i>=0 && i<=2){
                length = i+2
            } else if(i>=3&& i<=5) {
                length = i+3
            } else {
                length = i+4
            }
            for (let j = 0 ; j < newsTitle[length].length; j++){
                Four.push({
                    name: newsTitle[length][j],
                    parent: topParent
                })
            }

        }
        await Category.insertMany(Four)
        // await Category.insertMany(newsList)
        // console.log(newsList)
        const CsList = await Category.find().populate('parent').lean()
        res.send(CsList)
    })

    //音效分类数据展示
    router.get('/category/list',async (req,res)=> {
        //populate
        // const one = await Category.findOne({
        //     name: '音效'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'children'
        //     }
        // }).lean()
        //聚合查询
        const parent = await Category.findOne({
            name: '音效'
        })
        const list = await Category.aggregate([
            //条件查询
            { $match: {parent: parent._id} },
            //关联查询
            {
                $lookup: {
                    //关联的表
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'children'
                }
            },
        ])
        res.send(list)
    })
    //parent-children
    router.get('/category/children/:id',async (req,res)=> {
        const parent = await Category.findById(req.params.id)
        const children = await Category.where({
            parent: parent._id
        }).find()

        children.unshift({
            name: parent.name
        })

        res.send(children)
    })
    //用户数据导入
    router.get('/user/init',async(req,res)=> {
        await User.deleteMany({})
        const newsUser = ["udoxas", "carpuzi", "RADIY", "M4taiori", "joshuaempyre", "alexvsi.tv", "Pinball_Wiz", "Saya13", "theredshore", "Locky_bee", "martian", "triangelx"]
        // const newsUser = ["zyb","yzj"]
        const newsList = newsUser.map( user => {
            return {
                username: user,
                password: '123456'
                // password: Math.random().toString(36).slice(-8)
            }
        })
        await  User.insertMany(newsList)
        // await admin_user.insertMany(newsList)
        res.send(newsList)
    })

    //音乐数据
    router.get('/music/init',async (req,res)=> {
        //音乐
        const listSong = await TSong.find()
        const newsMusic = listSong
        //随机用户
        const upload =await User.find()
        const mixUser = function () {
            let index = Math.floor((Math.random()*upload.length))
            return upload[index]
        }
        //
        //环境分类
        const parent = await Category.findOne({
            name: '环境'
        })
        const categories = await Category.where({
            parent: parent
        }).find()
        //
        //
        const MusicList =  newsMusic.map(el => {
            const Category = categories.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                name: el.name,
                url: el.url,
                categories: Category[0],
                download: Math.floor(Math.random() * 10000),
                upload: mixUser(),
            }
        })
        await Song.deleteMany({})
        await Song.insertMany(MusicList)
        res.send(MusicList)
    })

    //音乐数据接口1
    router.get('/music/tlist/:id',async (req,res) => {

        const parent = await Category.findById(req.params.id)
        const list = await Category.aggregate([
            { $match: {parent: parent._id} },
            {
                $lookup: {
                    from: 'Songs',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'songList'
                }
            },
            {
                    $addFields: {
                        songList: { $slice: ['$songList', 3] }
                    }
            }

        ])
        list.unshift({
            name: parent.name
        })
        res.send(list)
    })
    //音乐数据接口2
    router.get('/music/list/:id',async (req,res)=> {
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
                $match: {  "_id":new ObjectId(req.params.id) }
            }
        ])
        res.send(list)
    })

    //计算热门
    router.get('/hot',async (req,res)=> {

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
            // let temp =  await Category.find({
            //     _id : listSon[i]._id
            // }).populate({
            //     path: 'newsList'
            // }).lean()
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
                    $lookup: {
                        from: 'categories',
                        localField: 'parent',
                        foreignField: '_id',
                        as: 'parent'
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
        })

        for (let j = 0; j < listHot.length - 1; j++) {
            //两两比较，如果前一个比后一个大，则交换位置。
            for (let i = 0; i < listHot.length - 1 - j; i++) {
                if (listHot[i].numbers < listHot[i + 1].numbers) {
                    let temp = listHot[i];
                    listHot[i] = listHot[i + 1];
                    listHot[i + 1] = temp;
                }
            }
        }

        res.send(listHot.slice(0,4))
    })

    app.use('/web/api', router)


}