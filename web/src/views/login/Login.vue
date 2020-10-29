<template>
    <div class="login-container">
        <el-card header="Login" class="login-card text-center fs-xxl py-3" style="border-radius: 1.1rem">
<!--            @submit.native.prevent="login"-->
            <el-form >
                <el-form-item label="用户名">
                    <el-input
                            placeholder="请输入账号"
                            v-model="input1"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                            placeholder="请输入密码"
                            v-model="input2"
                            type="password"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button  type="info" native-type="submit" plain>登录</el-button>
                </el-form-item>
            </el-form>
            <el-button style="border: transparent" plain class="fs-xs">注册新用户</el-button>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data(){
            return {
                model: {},
                input1: '',
                input2: ''
            }
        },
    }
</script>

<style scoped>
    .login-card{
        width: 25rem;
        margin: 15rem auto;
    }
</style>
