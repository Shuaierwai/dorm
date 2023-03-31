<template>
    <div class="EditStudentsSubcomponents">
        <el-dialog title="编辑学生" :visible="dialogEditStudentsFormVisible" @close="closeDialogEditStudentsBtn">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="学生名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入学生的姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off" placeholder="请输入学生的年龄"></el-input>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth" prop="studentsNum">
                    <el-input v-model="form.studentsNum" autocomplete="off" placeholder="请输入学生的学号"></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth" prop="userNum">
                    <el-input v-model="form.userNum" autocomplete="off" placeholder="请输入学生的账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="userPass">
                    <el-input v-model="form.userPass" autocomplete="off" placeholder="请输入学生的密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth" prop="tel">
                    <el-input v-model="form.tel" autocomplete="off" placeholder="请输入学生的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="所属寝室" :label-width="formLabelWidth" prop="dorm">
                    <el-select v-model="form.dorm" placeholder="请选择寝室">
                        <el-option v-for="item in editDormList" :key="item.d_id" :label="item.d_name"
                            :value="item.d_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属班级" :label-width="formLabelWidth" prop="classRoom">
                    <el-select v-model="form.classRoom" placeholder="请选择班级">
                        <el-option v-for="item in editClassList" :key="item.c_id" :label="item.c_name"
                            :value="item.c_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属楼宇" :label-width="formLabelWidth" prop="building">
                    <el-select v-model="form.building" placeholder="请选择楼宇">
                        <el-option v-for="item in editBuildingList" :key="item.b_id" :label="item.b_name"
                            :value="item.b_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属学院" :label-width="formLabelWidth" prop="academy">
                    <el-select v-model="form.academy" placeholder="请选择需要">
                        <el-option v-for="item in editAcademyList" :key="item.a_id" :label="item.a_name"
                            :value="item.a_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogEditStudentsBtn('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { EditStu } from '@/api/studentApi/getStudentsApi'
export default {
    props: ['dialogEditStudentsFormVisible', 'EditList', 'editDormList', 'editClassList', 'editBuildingList', 'editAcademyList'],
    data() {
        return {
            form: {
                id: '',
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
            rules: {
                name: [
                    { required: true, message: '请输入学生名字', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]{2,6}$/g, message: '中文格式错误' }
                ],
                age: [
                    { required: true, message: '请输入学生年龄', trigger: 'blur' },
                    { pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/g, message: '年龄格式错误' }
                ],
                studentsNum: [
                    { required: true, message: '请输入学生学号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '学号格式错误，长度在3到6位数字' }
                ],
                userNum: [
                    { required: true, message: '请输入学生账号', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '账号格式错误，长度在3到6位数字' }
                ],
                userPass: [
                    { required: true, message: '请输入学生密码', trigger: 'blur' },
                    { pattern: /^[0-9]{3,6}$/g, message: '账号格式错误，长度在3到6位数字' }
                ],
                tel: [
                    { required: true, message: '请输入学生手机号码', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g, message: '电话号码格式错误' }
                ],
                dorm: [
                    { required: true, message: '请选择所属寝室', trigger: 'change' }
                ],
                classRoom: [
                    { required: true, message: '请选择所属班级', trigger: 'change' }
                ],
                building: [
                    { required: true, message: '请选择所属楼宇', trigger: 'change' }
                ],
                academy: [
                    { required: true, message: '请选择所属学院', trigger: 'change' }
                ],
            },
        }
    },


    // mounted() {
    //     console.log(editDormList);
    // },

    methods: {
        closeDialogEditStudentsBtn(formName) {
            this.$emit('closeDialogEditBtn')
            console.log(this.$parent);
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
            this.$parent.editAcademyList = [];
            this.$parent.editDormList = [];
            this.$parent.editClassList = [];//可用班级
            this.$parent.editBuildingList = [];//楼宇列表

        },

        //正则验证完确定添加
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // console.log(valid);
                    let data = {
                        id: this.form.id,
                        editStudentNum: this.form.studentsNum,
                        editStudentSex: this.form.sex == 1 ? '男' : '女',
                        editStudentAge: this.form.age,
                        editStudentTel: this.form.tel,
                        editStudentName: this.form.name,
                        editStudentUser: this.form.userNum,
                        editStudentPass: this.form.userPass,
                        dormId: this.form.dorm,
                        classId: this.form.classRoom,
                        buildingId: this.form.building,
                        academyId: this.form.academy
                    };
                    console.log(data);
                    let res = await EditStu(data)
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$emit('render')
                        this.$emit('closeDialogEditBtn');
                        this.$parent.editAcademyList = [];
                        this.$parent.editDormList = [];
                        this.$parent.editClassList = [];//可用班级
                        this.$parent.editBuildingList = [];
                    }


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        EditList: {
            handler() {
                this.form.id = this.EditList.s_id;
                this.form.name = this.EditList.s_name;
                this.form.sex = this.EditList.s_sex == '男' ? '1' : '2';
                this.form.age = this.EditList.s_age;
                this.form.studentsNum = this.EditList.s_num;
                this.form.userNum = this.EditList.s_user;
                this.form.userPass = this.EditList.s_password;
                this.form.tel = this.EditList.s_tel;
                this.form.dorm = this.EditList.d_name;
                this.form.classRoom = this.EditList.c_name;
                this.form.building = this.EditList.b_name;
                this.form.academy = this.EditList.a_name;
            }
        },
        deep: true,
        immediate: true,
    }
}

</script>

<style></style>