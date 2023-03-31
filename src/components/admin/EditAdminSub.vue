<template>
    <div class="AddStudentsSubcomponents">
        <el-dialog title="编辑管理员" :visible="dialogEditAdminFormVisible" @close="closeDialogEditAdminBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="管理员名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入管理员的姓名"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth" prop="userNum">
                    <el-input v-model="form.userNum" autocomplete="off" placeholder="请输入管理员的账号" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="userPass">
                    <el-input v-model="form.userPass" autocomplete="off" placeholder="请输入管理员的密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth" prop="tel">
                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入管理员的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="所属类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="form.type" placeholder="请选择类型" disabled>
                        <el-option label="超级管理员" value="0"></el-option>
                        <el-option label="普通管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogEditAdminBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editAdmin } from '@/api/admin/Admin'
export default {
    props: ['dialogEditAdminFormVisible', 'editRow'],
    data() {
        return {
            form: {
                name: '',
                userNum: '',
                userPass: '',
                tel: '',
                type: '',
            },
            formLabelWidth: '15rem',

            //正则规则
            rules: {
                name: [
                    { required: true, message: '请输入管理员名字', trigger: 'blur' },
                   
                ],
                userNum: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '账号格式错误，长度在3到6位数字' }
                ],
                userPass: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '账号格式错误，长度在3到6位数字' }
                ],
                tel: [
                    { required: true, message: '请输入管理员手机号码', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g, message: '电话号码格式错误' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],

            },
        }
    },



    methods: {
        closeDialogEditAdminBtn(formName) {
            this.$emit('closeDialogEditAdminBtn');
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = {
                        id: this.editRow.u_id,
                        editAdminName: this.form.name,
                        editAdminPass: this.form.userPass,
                        editTel: this.form.tel,

                    }
                    console.log(data);
                    let res = await editAdmin(data)
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$emit('render');
                        this.$emit('closeDialogEditAdminBtn')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }
    },
    watch: {
        editRow: {
            handler() {
                this.form.name = this.editRow.u_name;
                this.form.userNum = this.editRow.u_user;
                this.form.userPass = this.editRow.u_password;
                this.form.tel = this.editRow.u_tel;
                this.form.type = this.editRow.u_type;

            },
            deep: true,
            immediate: true
        }
    }

}

</script>

<style></style>