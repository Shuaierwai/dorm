<template>
    <div class="ViewSubcomponents">
        <el-dialog title="查看学生" :visible="dialogViewStudentsFormVisible" @close="closeDialogStudentsBtn">
            <el-form :model="form">
                <el-form-item label="学生名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入学生的姓名" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="form.sex" label="1" disabled>男</el-radio>
                    <el-radio v-model="form.sex" label="2" disabled>女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off" placeholder="请输入学生的年龄" disabled></el-input>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="form.studentsNum" autocomplete="off" placeholder="请输入学生的学号" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.userNum" autocomplete="off" placeholder="请输入学生的账号" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.userPass" autocomplete="off" placeholder="请输入学生的密码" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入学生的手机号码" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属寝室" :label-width="formLabelWidth">
                    <el-input v-model="form.dorm" autocomplete="off" placeholder="请输入所属寝室" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属班级" :label-width="formLabelWidth">
                    <el-input v-model="form.classRoom" autocomplete="off" placeholder="请输入所属班级" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属楼宇" :label-width="formLabelWidth">
                    <el-input v-model="form.building" autocomplete="off" placeholder="请输入所属楼宇" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属学院" :label-width="formLabelWidth">
                    <el-input v-model="form.academy" autocomplete="off" placeholder="请输入所属学院" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { watch } from 'vue';
export default {
    props: ['dialogViewStudentsFormVisible', 'viewList'],
    data() {
        return {
            form: {
                name: '',
                sex: '1',
                age: '',
                studentsNum: '',
                userNum: '',
                userPass: '',
                tel: '',
                dorm: '',
                classRoom: '',
                building: '',
                academy: '',
            },
            formLabelWidth: '9rem',

            //正则规则

        }
    },



    methods: {
        closeDialogStudentsBtn() {
            this.$emit('closeDialogViewBtn')
        },

        //正则验证完确定添加
        submitForm() {
            console.log('确认');
            this.$emit('closeDialogViewBtn')
        }
    },

    watch: {
        viewList: {
            handler: function () {
               console.log(this.viewList);
                this.form.name=this.viewList.s_name;
                this.form.sex=this.viewList.s_sex=='男'?'1':'2';
                this.form.age=this.viewList.s_age;
                this.form.studentsNum=this.viewList.s_num;
                this.form.userNum=this.viewList.s_user;
                this.form.userPass=this.viewList.s_password;
                this.form.tel=this.viewList.s_tel;
                this.form.dorm=this.viewList.d_name;
                this.form.classRoom=this.viewList.c_name;
                this.form.building=this.viewList.b_name;
                this.form.academy=this.viewList.a_name;
            },
        },
        deep:true,
        immediate: true,
    }
}

</script>

<style></style>