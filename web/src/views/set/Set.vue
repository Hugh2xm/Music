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
            <el-tab-pane label="上传音频">
                <div class="bg-white pt-4 px-6">
                    <div class="set-head">音乐上传</div>
                    <div class="set-info pb-3" >
                        <el-form label-width="120px" @submit.native.prevent="save">
                            <el-form-item style="margin-top: 0.5rem;">
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :multiple="false"
                                        :limit="1"
                                        :on-success="Upload"
                                >
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将音频拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="歌曲名">
                                <el-input v-model="model.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="歌曲类型">
                                <el-cascader
                                        :props="{ expandTrigger: 'hover' }"
                                        :options="categories"
                                        v-model="value"
                                        :clearable="true"
                                        @change="handleChange"></el-cascader>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" native-type="submit">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="上传审核结果">
                <div class="bg-white pt-4 px-6">
                    <div class="set-head">音乐上传</div>
                    <div class="pb-3" >
                        <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="createTime"
                                    label="日期">
                                <template slot-scope="scope">
                                    {{scope.row.createTime | date}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="歌曲名称">
                            </el-table-column>
                            <el-table-column
                                    prop="mask"
                                    label="结果">
                                <template slot-scope="scope">
                                    <el-tag type="info" close-transition v-if="scope.row.mask === 0">
                                        等待处理
                                    </el-tag>
                                    <el-tag type="success" close-transition v-if="scope.row.mask === 1">
                                        通过
                                    </el-tag>
                                    <el-tag type="danger" close-transition v-if="scope.row.mask === 2">
                                        不通过
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        inject: ['reload'],
        name: "Set",
        filters: {
          date(val) {
              return dayjs(val).format('YYYY-MM-DD hh:mm')
          }
        },
        data() {
            //修改密码表单规则
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
                model: {
                    name:'',
                    url: '',
                    categories: '',
                },
                categories: [],
                options:[],
                value: '',
                tableData: []
            }
        },
        methods: {
            //修改密码方法：
            async checkUserID () {
                const res = await this.$http.get(`users/profile`)
                this.model.upload = res.data._id
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
            },
            //上传音乐方法：
            Upload(filter,file) {
                this.model.name = file.name
                this.model.url = file.response.url
                this.model.mask = 0
            },
            async save() {
                await this.$http.post('songs/UpSong',this.model)
                // 页面跳转
                this.reload()
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
            },
            //获取分类
            async categoryLast() {
                const res =  await this.$http.get('category/last')
                this.categories = res.data
                this.categories = JSON.parse(JSON.stringify(this.categories).replace(/name/g, 'label').replace(/_id/g, 'value'))
            },
            handleChange() {
                this.model.categories = this.value[2]
            },
            //显示上传之后管理员处理的结果
            async UploadStatic() {
                const res = await this.$http.get('UpSong')
                this.tableData = res.data
            }
        },
        created() {
            this.checkUserID()
            this.categoryLast()
            this.UploadStatic()
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