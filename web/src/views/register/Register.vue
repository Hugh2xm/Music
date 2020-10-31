<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix text-center">
            <span>注册</span>
        </div>
        <div class="text item">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" clearable placeholder="请输入您的用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" clearable show-password placeholder="请输入您的密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="ruleForm.checkPassword" clearable show-password placeholder="请再次输入您的密码"></el-input>
                </el-form-item>
                <el-form-item class="text-center mt-5">
                    <el-button type="primary" @click="onSubmit('ruleForm')" >注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "Register",
        data() {
            let validateUsername = (rule, value , callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }  else {
                    this.checkoutUser(value)
                    if(this.temp === true){
                        callback(new Error('用户已存在'));
                    } else {
                        callback();
                    }
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPassword !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkPassword: '',
                },
                model: '',
                rules: {
                    username: { required: true, validator: validateUsername, trigger: 'blur' },
                    password: { required: true , validator: validatePass, trigger: 'blur'},
                    checkPassword: { required: true, validator: validatePass2, trigger: 'blur'},
                },
                temp: '',
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        const res = await this.$http.post(`register`,this.ruleForm)
                        this.model = res.data
                        this.$router.push('/login');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async checkoutUser(username) {
                const res = await this.$http.get(`/user/${username}`)
                this.temp = res.data
            }
        }
    }
</script>

<style scoped>
.box-card {
    width: 35rem;
    padding: 3rem 5rem;
    margin: 10rem auto 0 auto;
}
</style>