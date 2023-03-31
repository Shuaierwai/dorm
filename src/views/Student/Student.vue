<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>学生管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入学生学号" style="width: 20%;margin-right: 1rem;" clearable
                        @clear="clearInput"></el-input>
                    <el-button type="primary" plain @click="searchBtn">搜索</el-button>
                    <el-button type="primary" plain @click="addStudent">添加</el-button>
                </div>
                <div>
                    <el-upload class="upload-demo" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChange" :auto-upload="false" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传Excel</el-button>

                    </el-upload>
                    <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-change="handleChange" accept=".xls, .xlsx" :auto-upload="false" :show-file-list="false">
                                    <el-button type="primary">
                                        <el-icon>
                                            <FolderAdd />
                                        </el-icon>
                                        批量导入
                                    </el-button>
                                </el-upload> -->
                </div>

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableStuData" border style="width: 100%">
                    <el-table-column prop="s_num" label="学号" width="50px">
                    </el-table-column>
                    <el-table-column prop="s_name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="s_sex" label="性别" width="40px">
                    </el-table-column>
                    <el-table-column prop="s_age" label="年龄" width="40px">
                    </el-table-column>
                    <el-table-column prop="s_tel" label="电话">
                    </el-table-column>
                    <el-table-column prop="s_user" label="账号">
                    </el-table-column>
                    <el-table-column prop="s_password" label="密码">
                    </el-table-column>
                    <el-table-column prop="c_name" label="班级">
                    </el-table-column>
                    <el-table-column prop="a_name" label="学院">
                    </el-table-column>
                    <el-table-column prop="d_name" label="寝室">
                    </el-table-column>
                    <el-table-column prop="b_name" label="楼宇">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="editStuBtn(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delStuBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 7, 10]" :page-size="count"
                        layout="total, sizes, prev, pager, next, jumper" :total="stuTotal">
                    </el-pagination>
                </div>
            </div>

            <!-- 添加子组件 -->
            <AddSubcomponent :dialogAddStudentsFormVisible="dialogAddStudentsFormVisible" :dormList="dormList"
                :classList="classList" :buildingList="buildingList" :academyList="academyList"
                @closeDialogAddStudent="closeDialogAddStudent" @render='render'></AddSubcomponent>

            <!-- 点击查看 -->
            <ViewSubcomponent :dialogViewStudentsFormVisible="dialogViewStudentsFormVisible"
                @closeDialogViewBtn="closeDialogViewBtn" :viewList="viewList"></ViewSubcomponent>
            <!-- 编辑 -->
            <EditStudentsSub :dialogEditStudentsFormVisible="dialogEditStudentsFormVisible" :EditList="EditList"
                :editDormList="editDormList" :editClassList="editClassList" :editBuildingList="editBuildingList"
                :editAcademyList="editAcademyList" @closeDialogEditBtn="closeDialogEditBtn" @render="render"
                @closeDialogEditStudentsBtn="clearList"></EditStudentsSub>

            <!-- 数据可视化 -->
            <div class="charts-box">
                <div class="charts-title">
                    <div class="charts-box-left"></div>
                    <div class="charts-name">
                        <span>学生分布</span>
                    </div>
                </div>
                <!-- 图表子组件 -->
                <ChartsStudents :academyTotal="academyTotal" :classTotal="classTotal" :stuTotal="stuTotal"
                    :sexTotal="sexTotal" v-if="academyTotal && classTotal && stuTotal && sexTotal"></ChartsStudents>

            </div>
        </div>
    </div>
</template>

<script>
import ChartsStudents from '@/components/students/ChartsStudents.vue';
import AddSubcomponent from '@/components/students/AddSubcomponent.vue';//添加子组件
import ViewSubcomponent from '@/components/students/ViewSubcomponent.vue';//查看子组件
import EditStudentsSub from '@/components/students/EditStudentsSub.vue';
import mixins from '@/utils/minixs'

import { getStudentExcel, getStudents, getAcademy, getClass, getSex, getBuilding, getAcademyNum, delStu } from '@/api/studentApi/getStudentsApi'
import { getDorms } from '@/api/dormApi/getDormApi'
export default {
    data() {
        return {
            dialogAddStudentsFormVisible: false,
            dialogViewStudentsFormVisible: false,
            dialogEditStudentsFormVisible: false,
            searchInput: '',
            academyTotal: '',
            classTotal: '',
            sexTotal: '',
            stuTotal: null,
            studentList: [],
            tableStuData: [],
            dormList: [],//有空位的寝室
            classList: [],//可用班级
            buildingList: [],//楼宇列表
            academyList: [],//学院列表
            viewList: [],//查看学生列表
            EditList: [],//编辑学生列表
            editDormList: [],
            editClassList: [],//可用班级
            editBuildingList: [],//楼宇列表
            editAcademyList: [],
        };
    },
    components: {
        ChartsStudents,
        AddSubcomponent,
        ViewSubcomponent,
        EditStudentsSub
    },
    //vue生命周期函数
    mounted() {
        this.render();
        this.getAcademyT();
        this.getClassT();
        this.getSexT()


        //  this.chartsList.push()
    },
    methods: {
        //渲染学生函数
        async render() {
            let data = {
                count: this.count,
                page: this.currentPage,
                search: this.searchInput.trim()
            }
            console.log(data);
            let res = await getStudents(data)
            // console.log(res);
            if (res.data.code == 200) {
                this.tableStuData = res.data.data
                this.stuTotal = res.data.total
            }
        },
        //获取学院个数
        async getAcademyT() {
            let res = await getAcademy()
            // console.log(res);
            if (res.data.code == 200) {
                this.academyTotal = res.data.total[0].academyT
                // console.log(this.academyTotal)
            }
        },
        async getClassT() {
            let res = await getClass()
            console.log('班级', res);
            if (res.data.code == 200) {
                this.classTotal = res.data.data.length
                //   console.log(this.classTotal)
            }
        },
        async getSexT() {
            let res = await getSex()
            //    console.log(res);
            if (res.data.code == 200) {
                this.sexTotal = res.data.data[0].total;
                //   console.log(this.classTotal)
            }
        },
        //点击搜索
        searchBtn() {
            this.render()
        },
        //点击清空
        clearInput() {
            this.render()
        },

        clearList() {
            console.log('清空了');
            this.EditList = ['']
        },

        async getInfo() {
            let data = {
                count: 5,
                page: 1,
                search: ''
            }
            let res = await getDorms(data)
            console.log(res);
            if (res.data.code == 200) {
                let dormList = res.data.data2;
                let dormPeople = res.data.data3;
                dormPeople.forEach(item => {
                    dormList.forEach(item2 => {
                        item.d_num == item2.d_num ? item2.studentNum = item.studentNum : ''
                    })
                })
                console.log(dormList)
                dormList.forEach(item => {
                    if (item.studentNum < 4 || item.studentNum == undefined) {
                        this.dormList.push(item)
                    }
                })
                console.log(this.dormList)

            }
            //获取可用班级个数
            let classRes = await getClass()
            // console.log(classRes);
            if (classRes.data.code == 200) {
                let classList = classRes.data.data;
                let classNumList = classRes.data.data2;
                // console.log(classList);
                classNumList.forEach(item => {
                    classList.forEach(item2 => {
                        item.c_name == item2.c_name ? item2.classNum = item.classNum : ''
                    })
                })
                // console.log(classList)
                classList.forEach(item => {
                    //判断大于30人就不加入列表
                    if (item.classNum < 30 || item.classNum == undefined) {
                        this.classList.push(item)
                    }
                })
                // console.log(this.classList);
            }
            //获取楼宇
            let BuildingRes = await getBuilding()
            // console.log(BuildingRes);
            if (BuildingRes.data.code == 200) {
                this.buildingList = BuildingRes.data.data
                //    console.log(this.buildingList);
            }

            let academyRes = await getAcademyNum()
            console.log(academyRes);
            if (academyRes.data.code == 200) {
                this.academyList = academyRes.data.data
            }

        },
        //点击添加按钮
        addStudent() {
            this.dialogAddStudentsFormVisible = true;
            this.getInfo()
        },
        closeDialogAddStudent() {
            this.dialogAddStudentsFormVisible = false
        },
        //点击查看
        handleClick(row) {
            this.dialogViewStudentsFormVisible = true;
            console.log(row);
            this.viewList = row
            console.log(this.viewList);
        },
        closeDialogViewBtn() {
            this.dialogViewStudentsFormVisible = false;
        },
        //点击编辑
        async editStuBtn(row) {
            this.dialogEditStudentsFormVisible = true;
            this.EditList = row;
            let data = {
                count: 5,
                page: 1,
                search: ''
            }
            let res = await getDorms(data)
            // console.log(res);
            if (res.data.code == 200) {
                let dormList = res.data.data2;
                let dormPeople = res.data.data3;
                dormPeople.forEach(item => {
                    dormList.forEach(item2 => {
                        item.d_num == item2.d_num ? item2.studentNum = item.studentNum : ''
                    })
                })
                // console.log(dormList)
                dormList.forEach(item => {
                    if (item.studentNum < 4 || item.studentNum == undefined) {
                        this.editDormList.push(item)
                    }
                })
                console.log(this.editDormList)

            }
            //获取可用班级个数
            let classRes = await getClass()
            // console.log(classRes);
            if (classRes.data.code == 200) {
                let classList = classRes.data.data;
                let classNumList = classRes.data.data2;
                // console.log(classList);
                classNumList.forEach(item => {
                    classList.forEach(item2 => {
                        item.c_name == item2.c_name ? item2.classNum = item.classNum : ''
                    })
                })
                // console.log(classList)
                classList.forEach(item => {
                    //判断大于30人就不加入列表
                    if (item.classNum < 30 || item.classNum == undefined) {
                        this.editClassList.push(item)
                    }
                })
                // console.log(this.classList);
            }
            //获取楼宇
            let BuildingRes = await getBuilding()
            // console.log(BuildingRes);
            if (BuildingRes.data.code == 200) {
                this.editBuildingList = BuildingRes.data.data
                //    console.log(this.buildingList);
            }

            let academyRes = await getAcademyNum()
            console.log(academyRes);
            if (academyRes.data.code == 200) {
                this.editAcademyList = academyRes.data.data
            }

        },
        closeDialogEditBtn() {
            this.dialogEditStudentsFormVisible = false
        },
        //点击删除
        delStuBtn(row) {
            this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // console.log(row.s_id);
                //执行成功
                let data = {
                    id: row.s_id
                }
                // console.log(data);
                let res = await delStu(data)
                console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.render()
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //文件导入
        handleChange(file, fileList) {

            console.log(file);
            if (!file) {
                return false
            } else if (!/\.(xls|xlsx)$/.test(file.raw.name.toLowerCase())) {
                this.$message({
                    type: 'success',
                    showClose: true,
                    message: '文件上传格式错误，请上传xls或xlsx格式文件'
                })
            }
            //文件格式正确开始处理数据
            const fileReader = new FileReader()
            fileReader.readAsBinaryString(file.raw)
            fileReader.onload = async (evt) => {
                const data2 = evt.target.result
                const tableData = this.$xlsx.read(data2, {
                    type: 'binary'
                })
                console.log(tableData);
                if (tableData.SheetNames.length >= 1) {
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '导入数据表格成功'
                    })
                }
                const tableName = tableData.SheetNames[0]
                const tableDataList = this.$xlsx.utils.sheet_to_json(tableData.Sheets[tableName])
                tableDataList.forEach((item, index) => {
                    // console.log(item,item['姓名']);
                    let list = [
                        null,
                        item['姓名'],
                        item['性别'],
                        item['年龄'],
                        item['学号'],
                        item['账号'],
                        item['密码'],
                        item['电话号码'],
                        item['寝室'],
                        item['班级'],
                        item['楼宇'],
                        item['学院']
                    ]
                    // console.log(list);
                    this.studentList.push(list)
                })
                //获取
                console.log(this.studentList);
                let data = this.studentList
                console.log(data)
                let res = await getStudentExcel(data)
                console.log(res)

            }

        },
    },
    mixins: [mixins],


}


</script>

<style lang="less" scoped>
#box {
    .student {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .header-title {
            width: 96%;
            height: 4rem;
            // padding: 2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            // background: red;
            .title-box {
                width: 0.5rem;
                height: 100%;
                background: #6c33fe;
                border-radius: 1rem;
                margin-right: 1rem;
            }

            .title-name {
                font-size: 2.5rem;
                font-weight: bold;
            }
        }

        .student-operate {
            width: 96%;
            height: 7rem;
            margin-top: 2rem;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // line-height: 7rem;
            padding: 0 2rem;

            .student-operate-left {
                width: 80%;

            }
        }

        .student-table {
            width: 96%;
            height: 70rem;
            // background: red;
            margin-top: 2rem;

            .page-box {
                width: 100%;
                margin-top: 1rem;
                text-align: right;
                // background: red;
                height: 4rem;
            }
        }

        .charts-box {
            width: 96%;


            .charts-title {
                width: 100%;
                height: 4rem;
                background: #fff;
                // padding: 2rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .charts-box-left {
                    width: 0.5rem;
                    height: 100%;
                    background: #6c33fe;
                    border-radius: 1rem;
                    margin-right: 1rem;


                }

                .charts-name {
                    font-size: 2.5rem;
                    font-weight: bold;
                }
            }


        }
    }

}
</style>