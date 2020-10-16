module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const User = mongoose.model('User')
    const Song = mongoose.model('Song')


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

    //音乐数据
    router.get('/music/init',async (req,res)=> {
        await Song.deleteMany({})
        const newsMusic = [{"name":"实录水滴落下的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202009/13377.mp3"},{"name":"水滴滴答自然环境音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202005/12861.mp3"},{"name":"高品质的水滴音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202004/12838.mp3"},{"name":"水滴声短信铃声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202003/12627.mp3"},{"name":"水滴落在水池里的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202002/12557.mp3"},{"name":"水滴滴落音效在线试听","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202001/12454.mp3"},{"name":"水滴滴答声音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202001/12432.mp3"},{"name":"水滴带混响的音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201911/12171.mp3"},{"name":"水滴在玻璃杯上的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201910/12139.mp3"},{"name":"立体的水滴声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201910/12068.mp3"},{"name":"水龙头滴水的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201905/11543.mp3"},{"name":"水滴和泉水的音效","url":"http://downsc.chinaz.net/Files  /DownLoad/sound1/201903/11296.mp3"},{"name":"雨水滴落在山洞的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201901/11118.mp3"},{"name":"下雨过后屋檐滴水音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201809/10564.mp3"},{"name":"3d清泉水滴声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201806/10215.mp3"},{"name":"水滴滴落音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201803/9843.mp3"},{"name":"水滴飞溅音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201802/9734.mp3"},{"name":"水滴落在水面上音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201711/9458.mp3"},{"name":"水管没关紧的滴答声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201711/9359.mp3"},{"name":"动感水滴3D音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201710/9311.mp3"},{"name":"小雨声实地录音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202009/13361.mp3"},{"name":"屋外下雨环境音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202009/13346.mp3"},{"name":"上升空气呼啸音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202008/13307.mp3"},{"name":"户外风声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202008/13273.mp3"},{"name":"明亮的持续雨声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202007/13168.mp3"},{"name":"冷风吹的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202007/13161.mp3"},{"name":"下着雨的鸟叫声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202006/12955.mp3"},{"name":"大雨打在雨蓬上的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202005/12946.mp3"},{"name":"雷雨袭击原声录音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202005/12859.mp3"},{"name":"暴风雨来临音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202004/12836.mp3"},{"name":"中雨的雨水声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202004/12793.mp3"},{"name":"强风声mp3","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202003/12650.mp3"},{"name":"影视惊恐的雷声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202003/12637.mp3"},{"name":"闪电咔嚓声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/202003/12631.mp3"},{"name":"阿特莫山大风吹的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201912/12344.mp3"},{"name":"打雷暴雨声mp3","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201911/12237.mp3"},{"name":"持续的风声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201909/12039.mp3"},{"name":"浑厚的打雷声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201909/11953.mp3"},{"name":"边打雷边下雨的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201908/11853.mp3"},{"name":"起风的声音音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201908/11855.mp3"},{"name":"强台风刮风时的音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201908/11856.mp3"},{"name":"打雷雷声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201907/11745.mp3"},{"name":"雷雨天气实录音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11627.mp3"},{"name":"从远处传来的闷雷声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201904/11461.mp3"},{"name":"夜晚超大闪电声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201901/11049.mp3"},{"name":"北风凌厉的吹风音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201809/10649.mp3"},{"name":"雷雨交织雷雨天音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201808/10479.mp3"},{"name":"很大的雷声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201807/10360.mp3"},{"name":"下大雨的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201806/10252.mp3"},{"name":"暴雪天气音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201806/10203.mp3"},{"name":"沙漠风吹音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201806/10206.mp3"},{"name":"打雷下雨音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201803/9872.mp3"},{"name":"风声不停的呼啸声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201802/9727.mp3"},{"name":"哗啦哗啦下雨声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201802/9728.mp3"},{"name":"夜晚闪电声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201711/9388.mp3"},{"name":"犀利的风声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201708/9038.mp3"},{"name":"噼里啪啦雨点声","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201706/8801.mp3"},{"name":"冬天刮风的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201703/8491.mp3"},{"name":"夏季雷雨天气音效","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201612/8170.mp3"},{"name":"大自然打雷下雨的声音","url":"http://downsc.chinaz.net/Files/DownLoad/sound1/201611/7981.mp3"}]
        //随机用户
        const upload =await User.find()
        const mixUser = function () {
            let index = Math.floor((Math.random()*upload.length))
            return upload[index]
        }

        //环境分类
        const parent = await Category.findOne({
            name: '环境'
        })

        const categories = await Category.where({
            parent: parent
        }).find()


        const MusicList =  newsMusic.map(el => {
            const Category = categories.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                name: el.name,
                url: el.url,
                categories: Category.slice(0,2),
                download: Math.floor(Math.random() * 10000),
                upload: mixUser(),
            }
        })
        await Song.insertMany(MusicList)
        res.send(MusicList)
    })

    //
    app.use('/web/api', router)


}