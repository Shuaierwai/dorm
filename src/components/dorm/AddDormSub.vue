<template>
    <div class="AddStudentsSubcomponents">
        <el-dialog title="添加寝室" :visible="dialogAddDormFormVisible" @close="closeDialogDormBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="寝室编号" :label-width="formLabelWidth" prop="DormNum">
                    <el-input v-model="form.DormNum" autocomplete="off" placeholder="请输入寝室的编号"></el-input>
                </el-form-item>
                <el-form-item label="寝室名字" :label-width="formLabelWidth" prop="DormName">
                    <el-input v-model="form.DormName" autocomplete="off" placeholder="请输入寝室的名字"></el-input>
                </el-form-item>
                <el-form-item label="寝室余额" :label-width="formLabelWidth" prop="money">
                    <el-input v-model="form.money" autocomplete="off" placeholder="请输入寝室的金额"></el-input>
                </el-form-item>
                <el-form-item label="寝室状态" :label-width="formLabelWidth" prop="dormState">
                    <el-input v-model="form.dormState" autocomplete="off" placeholder="请输入寝室状态" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogDormBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addDorms } from '@/api/dormApi/getDormApi'
export default {
    props: ['dialogAddDormFormVisible'],
    data() {
        return {
            form: {
                DormNum: '',
                DormName: '',
                money: 0,
                dormState: '正常',
            },
            formLabelWidth: '9rem',

            //正则规则
            rules: {
                DormNum: [
                    { required: true, message: '请输入寝室编号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '寝室编号格式错误，长度在3到6位数字' }
                ],
                DormName: [
                    { required: true, message: '请输入寝室名字', trigger: 'blur' },
                ],
                money: [
                    { required: true, message: '请输入寝室初始余额', trigger: 'blur' },
                    { pattern: /^([-+])?\d+(\.[0-9]{1,2})?$/g, message: '金额格式错误' }
                ],
                dormState: [
                    { required: true, message: '请输入寝室状态', trigger: 'blur' },
                ],
            },
        }
    },



    methods: {
        closeDialogDormBtn(formName) {
            this.$emit('closeDialogAddDorm')
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = {
                        addDormNum: this.form.DormNum.trim(),
                        addDormName: this.form.DormName.trim(),
                        addDormPay: this.form.money,
                    }
                    let res = await addDorms(data)
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.$emit('closeDialogAddDorm')
                        this.$emit('render')
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