<template>
    <div>
        <el-card class="box-card" shadow="hover" style="margin: 5rem auto 0 auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}管理员</span>
            </div>
            <div class="text item">
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item  label="用户名">
                                <el-input v-model="model.username" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="showRentPrise">
                        <el-col :span="16">
                            <el-form-item  label="密码">
<!--                                <el-input type="password" v-model="model.password" ></el-input>-->
                                <el-input v-model="model.password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :offset="14">
                            <el-form-item >
                                <el-button type="primary" native-type="submit" >保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CategoriesCreate",
        props: {
            id: {}
        },
        data () {
            return {
                model: {},
                showRentPrise:true
            }
        },
        methods: {
            changeStatus(){
                if( this.id ){
                    this.showRentPrise = false
                }
            },
            //移除
            handleClose(tag) {
                this.model.child.splice(this.model.child.indexOf(tag), 1);
            },
            //点击添加显示输入框
            showInput() {
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加数据
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.model.child.push(inputValue);
                }
                this.inputValue = '';
            },
            //添加/修改数据
            async save () {
                if ( this.id ) {
                    await this.$http.put(`rest/admin_users/${this.id}`, this.model)
                } else {
                    await this.$http.post('rest/admin_users',this.model)
                }
                this.$router.push('/admin_users/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/admin_users/${this.id}`)
                this.model = res.data
            },
        },
        created () {
            this.changeStatus()
            this.id && this.fetch()
        }
    }
</script>


<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>