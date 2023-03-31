<template>
    <div class="ViewAdminSubcomponents">
        <el-dialog title="查看管理员" :visible="dialogViewAdminFormVisible" @close="closeDialogViewAdminBtn">
            <el-form :model="form">
                <el-form-item label="管理员名称" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入管理员的姓名" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth" >
                    <el-input v-model="form.userNum" autocomplete="off" placeholder="请输入管理员的账号" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" >
                    <el-input v-model="form.userPass" autocomplete="off" placeholder="请输入管理员的密码" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入管理员的手机号码" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属类型" :label-width="formLabelWidth">
                    <el-input v-model="form.type" autocomplete="off" placeholder="请输入管理员的类型" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialogViewAdminBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['dialogViewAdminFormVisible','viewRow'],
    data() {
        return {
            form: {
                name: '',
                userNum: '',
                userPass: '',
                tel: '',
                type: '',
            },
            formLabelWidth: '10rem',

            //正则规则
          
        }
    },



    methods: {
        closeDialogViewAdminBtn() {
            this.$emit('closeDialogViewAdminBtn')
        },

        
    },

    //监听
    watch:{
        viewRow:{
            handler(){
                console.log(this.viewRow);
                this.form.name=this.viewRow.u_name;
                this.form.userNum=this.viewRow.u_user;
                this.form.userPass=this.viewRow.u_password;
                this.form.tel=this.viewRow.u_tel;
                this.form.type=this.viewRow.u_type;

            },
            deep:true,
            immediate:true
        }
    }
}

</script>

<style>

</style>