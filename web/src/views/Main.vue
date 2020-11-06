<template>
    <div>
        <el-container>
            <el-header class="bg-white border-bottom" style="position: fixed;top: 0;width: 100%;z-index: 999">
                <el-row :gutter="20" >
                    <el-col :span="1" :offset="1" class="mt-2">
                        <el-button round>圆角按钮</el-button>
                    </el-col>
                    <div class="mt-3">
                        <el-col :span="1.5" :offset="16" >
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <i class="el-icon-user btn el-dropdown-link"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link tag="div" to="/login">
                                        <el-dropdown-item icon="el-icon-place" >登录/注销</el-dropdown-item>
                                    </router-link>
                                    <router-link tag="div" to="/register">
                                        <el-dropdown-item icon="el-icon-place" >注册</el-dropdown-item>
                                    </router-link>
                                    <router-link tag="div" to="/set">
                                        <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                                    </router-link>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="1.5">
                            <i @click="title = true" class="el-icon-s-unfold btn"></i>
                        </el-col>
                        <el-col :span="1.5">
                            <i @click="drawer = true" class="el-icon-search btn" ></i>
                        </el-col>
                    </div>
                    <el-drawer
                            :visible.sync="title"
                            :with-header="false"
                    >
                        <el-col :span="24">
                            <el-menu
                                    default-active="1"
                                    class="el-menu-vertical-demo"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b"
                            >
                                <router-link tag="div" to="/" @click.native="rightDrawDisplay">
                                    <el-menu-item index="1">
                                        <i class="el-icon-collection-tag"></i>
                                        <span  slot="title">
                                        首页
                                    </span>
                                    </el-menu-item>
                                </router-link>
                                <router-link tag="a"
                                             :to="`/ttlist/${index._id}`"
                                             v-for="(index,item) of list"
                                             :key="item"
                                             @click.native="rightDrawDisplay">
                                    <el-menu-item :index="(item+1).toString()" >
                                        <i class="el-icon-collection-tag"></i>
                                        <span slot="title">
                                        {{index.name}}
                                        </span>
                                    </el-menu-item>
                                </router-link>
                            </el-menu>
                        </el-col>
                    </el-drawer>
                    <!-- 搜索下拉框 -->
                    <el-drawer
                            :visible.sync="drawer"
                            :with-header="false"
                            :direction="direction">
                        <div class="search">
                            <div class="demo-input-suffix">
                                <el-input :placeholder="this.searchTitle" v-model="input" class="input-with-select" @keyup.enter.native="searchSong" >
                                    <el-button slot="append" icon="el-icon-search" @click="searchSong"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </el-drawer>
                </el-row>
            </el-header>
        </el-container>
        <router-view :key="$route.path"></router-view>
        <el-container class="text-center mt-5 border-top pt-5">
            <el-footer>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="header">
                            <span>供稿</span>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">作品上传</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">签约设计师</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">签约讲师</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="header">
                            <span>FAQ</span>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">帐号/密码</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">下载/使用</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">会员/售后</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="header">
                            <span>声明</span>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">上传声明</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">注册声明</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">版权声明</a>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="header">
                            <span>爱给</span>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">合作伙伴</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">加入我们</a>
                        </div>
                        <div class="item">
                            <a rel="nofollow" target="_blank">关于我们</a>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="m-4">
                    <el-col :span="12" :offset="6">Soundsnap © 2008 - 2020, All rights reserved</el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                title: false,
                drawer: false,
                direction: 'ttb',
                input: '',
                list: '',
                searchList: [],
                searchTitle: ''
            };
        },
        methods: {
            async fetchMenu() {
                const res = await this.$http.get(`category/list`)
                this.list = res.data
                console.log(this.list)
            },
            async searchSong() {
                if(this.input === '') {
                    this.$router.push(`/slist/${this.searchTitle}`)
                } else {
                    this.$router.push(`/slist/${this.input}`)
                }
                this.drawer = false
                this.categoryLast()
            },
            async categoryLast() {
                const res =  await this.$http.get('category/last')
                for (let i = 0; i < res.data[0].children[0].children.length; i++) {
                    this.searchList.push(res.data[0].children[0].children[i].name)
                }
                let index = Math.floor((Math.random()*this.searchList.length));
                this.searchTitle = this.searchList[index]

            },

            rightDrawDisplay()  {
                this.title =  false
            }
        },
        created() {
            this.fetchMenu()
            this.categoryLast()
        }
    }
</script>

<style scoped lang="scss">
.btn {
    font-size: 2rem;
    color: black;
}
.btn:hover {
    color: #999999;
}
.search {
    width: 50%;
    margin: 3rem auto 0 auto;
}
.header {
    margin-bottom: 1rem;
}
.item {
    margin-bottom: .5rem;
}

</style>