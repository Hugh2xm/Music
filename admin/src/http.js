import axios from 'axios'


//后台接口
//api放到admin/api里面去
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http