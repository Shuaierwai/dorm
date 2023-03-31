<template>
    <div class="AddStudentsSubcomponents">
        <el-dialog title="维修管理" :visible="dialogEditMainFormVisible" @close="closeDialogMainBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="上报照片" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :auto-upload="false" disabled>
                        <!-- :on-change="changeAddImg" -->
                        <img v-if="form.imageUrl" :src="'http://localhost:8880' + form.imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上报内容" :label-width="formLabelWidth" prop="mainContent">
                    <el-input type="textarea" :rows="2" v-model="form.mainContent" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="上报时间" :label-width="formLabelWidth" prop="time">
                    <el-input v-model="form.time" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="上报状态" :label-width="formLabelWidth" prop="state">
                    <el-select v-model="form.state" placeholder="请选择状态">
                        <el-option label="已处理" value="1"></el-option>
                        <el-option label="未处理" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogMainBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editMain } from '@/api/maintenance/maintenanceApi'
export default {
    props: ['dialogEditMainFormVisible', 'mainEditRow'],
    data() {
        return {
            form: {
                id: null,
                imageUrl: '',
                mainContent: '',
                time: '',
                state: '',
            },
            formLabelWidth: '15rem',

            //正则规则
            rules: {
                noticeName: [
                    { required: true, message: '请输入公告标题', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入公告内容', trigger: 'blur' },
                ],
            },
        }
    },



    methods: {
        closeDialogMainBtn(formName) {
            this.$emit('closeDialogEditMainBtn')
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // alert('submit!');
                    console.log(this.form.state);
                    let data = {
                        id: this.form.id,
                        editState: this.form.state
                    }
                    console.log(data);
                    let res = await editMain(data)
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.$emit('closeDialogEditMainBtn');
                        this.$emit('render')
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },

    watch: {
        mainEditRow: {
            handler() {
                console.log(this.mainEditRow);
                this.form.id = this.mainEditRow.m_id;
                this.form.imageUrl = this.mainEditRow.m_imgUrl;
                this.form.mainContent = this.mainEditRow.m_content;
                this.form.time = this.mainEditRow.m_time;
                this.form.state = this.mainEditRow.m_state == 0 ? '未处理' : '已处理';
            }
        },
        deep: true,
        immediate: true
    }

}

</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #999;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>