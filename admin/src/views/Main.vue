<template>
    <el-container style="height: 100vh;">
        <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <el-menu router @open="handleOpen" @close="handleClose">
                <el-menu-item index="/"><i class="el-icon-news"></i>首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-document"></i>内容管理</template>
                    <el-submenu index="2-1">
                        <template slot="title">分类</template>
                        <el-menu-item index="/categories/create">新建分类</el-menu-item>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-2">
                        <template slot="title">广告位</template>
                        <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                        <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-3">
                        <template slot="title">管理员</template>
                        <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                        <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2-4">
                        <template slot="title">用户</template>
                        <el-menu-item index="/users/create">新建用户</el-menu-item>
                        <el-menu-item index="/users/list">用户列表</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-bell"></i>歌曲管理</template>
                    <el-submenu index="3-1">
                        <template slot="title">歌曲</template>
                        <el-menu-item index="/songs/create">新建歌曲</el-menu-item>
                        <el-menu-item index="/songs/list">歌曲列表</el-menu-item>
                        <el-menu-item index="/songs/upload">上传</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-2">
                        <template slot="title">合辑</template>
                        <el-menu-item index="/collections/create">新建合辑</el-menu-item>
                        <el-menu-item index="/collections/list">合辑列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-3">
                        <template slot="title">评论</template>
                        <el-menu-item index="/comments/create">新建评论</el-menu-item>
                        <el-menu-item index="/comments/list">评论列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3-4">
                        <template slot="title">用户上传管理</template>
                        <el-menu-item index="/check/list">上传列表</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>