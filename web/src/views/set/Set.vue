<template>
    <div class="set-box">
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="修改密码">
                <div class="bg-white pt-4 px-6">
                    <div class="set-head">修改密码</div>
                    <div class="set-info pb-3" >
                        <el-form ref="ruleForm" :model="ruleForm"  :rules="rules">
                            <el-form-item label="用户名:">
                                <el-input v-model="ruleForm.username" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" prop="password">
                                <el-input v-model="ruleForm.password" clearable show-password type="password"></el-input>
                            </el-form-item>
                            <el-form-item class="ml-5">
                                <el-button type="primary" @click="checkPassword">验证</el-button>
                            </el-form-item>
                            <el-form-item label="新密码:" prop="newPassword">
                                <el-input v-model="ruleForm.newPassword" clearable show-password :disabled="this.display" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="再次输入新密码:" prop="CheckNewPassword">
                                <el-input v-model="ruleForm.CheckNewPassword" clearable show-password :disabled="this.display" type="password"></el-input>
                            </el-form-item>
                            <el-form-item class="ml-5">
                                <el-button type="primary" @click="ChangePassword">修改密码</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Set",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                tabPosition: 'left',
                ruleForm: {
                    username: '',
                    password: '',
                    newPassword: '',
                    CheckNewPassword:'',
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    CheckNewPassword: [
                        { validator: validatePass2, trigger: 'blur'}
                    ]

                },
                display: true,
            }
        },
        methods: {
            async checkUserID () {
                const res = await this.$http.get(`users/profile`)
                Object.assign(this.ruleForm,res.data)
            },
            async checkPassword () {
                const res = await this.$http.post('users/password',this.ruleForm)
                if (res.data) {
                    this.display = false
                } else {
                    this.display = true
                }
            },
            async ChangePassword() {
                const res = await this.$http.put(`edit/password/${this.ruleForm._id}`,this.ruleForm)
                if(res) {
                    this.$router.push('/login');
                }
            }
        },
        created() {
            this.checkUserID()
        }
    }
</script>

<style scoped>
.set-box {
    margin: 10rem 20rem 4rem 20rem;
}
.set-head {
    width: 60%;
    padding: 2rem 0;
    border-bottom: 2px solid #8c939d;
}

.set-info {
    width: 40%;
    margin-top: 3rem;
}
</style>