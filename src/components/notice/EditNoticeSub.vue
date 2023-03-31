<template>
    <div class="AddStudentsSubcomponents">
        <el-dialog title="添加公告" :visible="dialogEditNoticeFormVisible" @close="closeDialogNoticeEditBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="公告编号" :label-width="formLabelWidth" prop="DormNum">
                    <el-input v-model="form.editNoticeNum" autocomplete="off" placeholder="请输入公告的编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="公告标题" :label-width="formLabelWidth" prop="DormName">
                    <el-input v-model="form.editNoticeTitle" autocomplete="off" placeholder="请输入公告的标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="formLabelWidth" prop="money">
                    <el-input type="textarea" :rows="2" v-model="form.editNoticeContent" autocomplete="off"
                        placeholder="请输入公告的内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogNoticeEditBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editNotice } from '@/api/noticeApi/getNoticeApi'
export default {
    props: ['dialogEditNoticeFormVisible', 'editRow'],
    data() {
        return {
            form: {
                editNoticeNum: '',
                editNoticeContent: '',
                editNoticeTitle: '',
                editId: '',
            },
            formLabelWidth: '9rem',

            //正则规则
            rules: {
                editNoticeNum: [
                    { required: true, message: '请输入公告编号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '寝室编号格式错误，长度在3到6位数字' }
                ],
                editNoticeContent: [
                    { required: true, message: '请输入公告内容', trigger: 'blur' },
                ],

                editNoticeTitle: [
                    { required: true, message: '请输入公告标题', trigger: 'blur' },
                ],
            },
        }
    },



    methods: {
        closeDialogNoticeEditBtn(formName) {
            this.$emit('closeDialogEditNoticeBtn')
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = {
                        editNoticeContent: this.form.editNoticeContent,
                        editNoticeTitle: this.form.editNoticeTitle,
                        id: this.form.editId
                    }
                    console.log(data);
                    let res = await editNotice(data);
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$emit('render');
                        this.$emit('closeDialogEditNoticeBtn')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    watch: {
        editRow: {
            handler() {
                this.form.editId = this.editRow.n_id
                this.form.editNoticeNum = this.editRow.n_num;
                this.form.editNoticeContent = this.editRow.n_content;
                this.form.editNoticeTitle = this.editRow.n_title
            }
        },
        deep: true,
        immediate: true
    }
}

</script>

<style></style>