<template>
    <div>
        <el-card class="box-card" style="width: 70rem;margin: 3rem auto">
            <div slot="header" class="clearfix">
                <span>音频详细</span>
            </div>
            <div class="text item" >
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row>
                        <el-col :span="22">
                            <VueAudio :url="this.model.url"
                                      :name="this.model.name"
                                      :upload="this.uploadName"
                                      :categories="this.categoryName">
                            </VueAudio>
                        </el-col>
                        <el-col :offset="17" style="margin-top: 2rem">
                            <el-button native-type="submit">通过</el-button>
                            <router-link tag="el-button" to="/check/list" @click.native="noSave">不通过</router-link>
                            <router-link tag="el-button" to="/check/list">返回</router-link>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>
    </div>
</template>

<script>
    import VueAudio from "./components/VueAudio";
    export default {
        name: "CheckParticular",
        props: {
            id: {},
        },
        components: {
          VueAudio
        },
        data() {
          return {
              model: {},
              categoryName: '',
              uploadName:'',
          }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`rest/UpSong/${this.id}`)
                this.model = res.data
                this.categoryName = res.data.categories.name
                this.uploadName = res.data.upload.username
                this.model.download = 0;
                // console.log(this.model)
            },
            async save() {
                await this.$http.post('rest/songs', this.model)
                this.model.mask = 1
                await this.$http.put(`rest/UpSong/${this.id}`, this.model)
                this.$message({
                    type: 'success',
                    message: '通过'
                })
                this.$router.push('/check/list')
            },
            async noSave() {
                this.model.mask = 2
                await this.$http.put(`rest/UpSong/${this.id}`, this.model)
                this.$router.push('/check/list')
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>