<template>
    <div class="AddStudentsSubcomponents">
        <el-dialog title="添加公告" :visible="dialogAddNoticeFormVisible" @close="closeDialogNoticeBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="公告编号" :label-width="formLabelWidth" prop="noticeNum">
                    <el-input v-model="form.noticeNum" autocomplete="off" placeholder="请输入公告编号"></el-input>
                </el-form-item>
                <el-form-item label="公告的标题" :label-width="formLabelWidth" prop="noticeName">
                    <el-input v-model="form.noticeName" autocomplete="off" placeholder="请输入公告的标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="formLabelWidth" prop="content">
                    <el-input type="textarea" :rows="2" v-model="form.content" autocomplete="off"
                        placeholder="请输入公告内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogNoticeBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addNotice } from '@/api/noticeApi/getNoticeApi';
import { toDate } from '@/utils/TimeFormat'

export default {
    props: ['dialogAddNoticeFormVisible'],
    data() {
        return {
            form: {
                noticeNum: '',
                noticeName: '',
                content: '',
            },
            formLabelWidth: '15rem',

            //正则规则
            rules: {
                noticeNum: [
                    { required: true, message: '请输入公告编号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '公告编号格式错误，长度在3到6位数字' }
                ],
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
        closeDialogNoticeBtn(formName) {
            this.$emit('closeDialogAddNotice')
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let date = new Date()
                    let data = {
                        addNoticeNum: this.form.noticeNum,
                        addNoticeContent: this.form.content,
                        addUser: JSON.parse(sessionStorage.getItem('userInfo'))[0].u_id,
                        addNoticeTitle: this.form.noticeName,
                        addNoticeDate: toDate(date)
                    }
                    // console.log(data);
                    let res = await addNotice(data)
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '添加公告成功',
                            type: 'success'
                        });
                        this.$emit('render');
                        this.$emit('closeDialogAddNotice')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}

</script>

<style></style>