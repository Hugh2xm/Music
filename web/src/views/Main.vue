<template>
    <div>
        <el-container>
            <el-header class="bg-primary">
                <el-row :gutter="20" class="" >
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
                                    <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
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
                </el-row>
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
                            <router-link tag="div" to="/">
                                <el-menu-item index="1">
                                    <i class="el-icon-collection-tag"></i>
                                    <span  slot="title">
                                        首页
                                    </span>
                                </el-menu-item>
                            </router-link>
                            <router-link tag="div" to="/list">
                                <el-menu-item index="2">
                                    <i class="el-icon-setting"></i>
                                    <span  slot="title">
                                        消息中心
                                    </span>
                                </el-menu-item>
                            </router-link>
                            <router-link tag="div" to="/login">
                                <el-menu-item index="3">
                                    <i class="el-icon-setting"></i>
                                    <span  slot="title">
                                        消息中心
                                    </span>
                                </el-menu-item>
                            </router-link>
                        </el-menu>
                    </el-col>
                </el-drawer>
                <el-drawer
                        :visible.sync="drawer"
                        :with-header="false"
                        :direction="direction">
                        <div class="search">
                            <div class="demo-input-suffix">
                                <el-input
                                        placeholder="请输入内容"
                                        prefix-icon="el-icon-search"
                                        v-model="input">
                                </el-input>
                            </div>
                        </div>
                </el-drawer>
            </el-header>
        </el-container>
        <router-view></router-view>
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
            };
        }
    }
</script>

<style scoped lang="scss">
.btn {
    font-size: 2rem;
    color: white;
}
.btn:hover {
    color: #ffd04b;
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