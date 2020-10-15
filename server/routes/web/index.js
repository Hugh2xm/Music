module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const User = mongoose.model('User')
    const admin_user = mongoose.model('AdminUser')

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

    //
    app.use('/web/api', router)


}