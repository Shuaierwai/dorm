<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>宿舍管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入宿舍名字" style="width: 20%;margin-right: 1rem;" clearable
                        @clear="clearBtn"></el-input>
                    <el-button type="primary" plain @click="searchDormBtn">搜索</el-button>
                    <el-button type="primary" plain @click="addDorm">添加</el-button>
                </div>
                <!-- <div>
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="handleChange" :auto-upload="false">
                                <el-button size="small" type="primary">点击上传Excel</el-button>
                            
                            </el-upload>
                        </div> -->

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="d_num" label="寝室编号">
                    </el-table-column>
                    <el-table-column prop="d_name" label="寝室名称">
                    </el-table-column>
                    <el-table-column prop="d_money" label="寝室余额">
                    </el-table-column>
                    <el-table-column prop="studentNum" label="寝室人数">
                    </el-table-column>
                    <el-table-column prop="d_state" label="寝室状态">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="ViewDormBtn(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="editDormBtn(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delDormBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="this.tableDataTotal.length">
                    </el-pagination>
                </div>

            </div>

            <!-- 添加子组件 -->
            <AddDormSub :dialogAddDormFormVisible="dialogAddDormFormVisible" @closeDialogAddDorm="closeDialogAddDorm"
                @render="render"></AddDormSub>

            <!-- 点击查看 -->
            <ViewDormSub :dialogViewDormFormVisible="dialogViewDormFormVisible"
                @closeDialogViewDormBtn="closeDialogViewDormBtn" :viewList="viewList"></ViewDormSub>
            <!-- 编辑 -->
            <EditDormSub :dialogEditDormFormVisible="dialogEditDormFormVisible"
                @closeDialogEditDormBtn="closeDialogEditDormBtn" :editDormList="editDormList" @render="render">
            </EditDormSub>

            <!-- 数据可视化 -->
            <div class="charts-box">
                <div class="charts-title">
                    <div class="charts-box-left"></div>
                    <div class="charts-name">
                        <span>学生分布</span>
                    </div>
                </div>
                <!-- 图表子组件 -->
                <ChartsDorm :stuNumTotal="stuNumTotal" :tableDataTotal="tableDataTotal" :userNumTotal="userNumTotal"
                    :buildingTotal="buildingTotal" :normalDormList="normalDormList" :arrearsDorm="arrearsDorm"></ChartsDorm>

            </div>
        </div>
    </div>
</template>

<script>
import ChartsDorm from '@/components/dorm/ChartsDorm.vue';
import AddDormSub from '@/components/dorm/AddDormSub.vue';//添加子组件
import ViewDormSub from '@/components/dorm/ViewDormSub.vue';//查看子组件
import EditDormSub from '@/components/dorm/EditDormSub.vue';
//导入接口
import { getDorms, delDorms } from '@/api/dormApi/getDormApi';
import { getStudents, getBuilding } from '@/api/studentApi/getStudentsApi';
import { getUser } from '@/api/userApi/getUserApi'
import mixins from '@/utils/minixs';
export default {
    data() {
        return {
            dialogAddDormFormVisible: false,
            dialogViewDormFormVisible: false,
            dialogEditDormFormVisible: false,
            searchInput: '',
            tableDataTotal: '',
            tableData: [],
            viewList: [],//查看的数据
            editDormList: [],//编辑的数据
            stuNumTotal: '',//学生总数
            userNumTotal: '',//管理员
            buildingTotal: '',
            normalDormList: '',//正常寝室
            arrearsDorm:''//欠费寝室
        };
    },
    components: {
        ChartsDorm,
        AddDormSub,
        EditDormSub,
        ViewDormSub
    },

    created() {
        this.render()
        this.getStudentNum()
        this.getUserNum()
        this.getBuildingNum()
    },
    methods: {
        //渲染数据函数
        async render() {
            let data = {
                count: this.count,
                page: this.currentPage,
                search: this.searchInput.trim()
            }
            let res = await getDorms(data)
            console.log(res);
            if (res.data.code == 200) {
                this.dormList=res.data.data;  
              let list=res.data.data.filter(item=>{
                    return item.d_state==1
                })
               this.normalDormList=list.length;
               this.arrearsDorm=res.data.data.length-list.length
                console.log('list',list);
                    res.data.data2.forEach(item => {
                        res.data.data3.forEach(item2 => {

                            item.d_num == item2.d_num ? item.studentNum = item2.studentNum : ''
                        })
                    });
                this.tableDataTotal = res.data.data
                res.data.data2.forEach(item => {
                    item.d_state == 1 ? item.d_state = '正常' : item.d_state = '欠费';
                    if (item.studentNum == undefined) {
                        item.studentNum = 0
                    }
                })
                console.log(res.data.data2);
                this.tableData = res.data.data2
                // this.tableData=res.data.data2


            }
        },
        async getStudentNum() {
            let data = {
                search: '',
                page: 1,
                count: 5,
            };
            let res = await getStudents(data)
            console.log(res);
            if (res.data.code == 200) {
                this.stuNumTotal = res.data.data.length
            }
        },
        //获取管理员
        async getUserNum() {
            let data = {
                count: 5,
                page: 1,
                search: ''
            }
            let res = await getUser(data)
            console.log(res);
            if (res.data.code == 200) {
                this.userNumTotal = res.data.data.length
                console.log(this.userNumTotal);
            }
        },
        //获取楼宇
        async getBuildingNum() {
            let res = await getBuilding()
            console.log('res', res);
            if (res.data.code == 200) {
                this.buildingTotal = res.data.data.length;
                this.buildingList = res.data.data
            }
        },
        //点击搜索
        searchDormBtn() {
            this.render()
        },
        //点击清除
        clearBtn() {
            this.render()
        },
        //点击添加按钮
        addDorm() {
            this.dialogAddDormFormVisible = true
        },
        closeDialogAddDorm() {
            this.dialogAddDormFormVisible = false
        },
        //点击查看
        ViewDormBtn(row) {
            this.dialogViewDormFormVisible = true;
            this.viewList = row;
        },
        closeDialogViewDormBtn() {
            this.dialogViewDormFormVisible = false;
        },
        //点击编辑
        editDormBtn(row) {
            this.dialogEditDormFormVisible = true;
            this.editDormList = row;
            console.log(this.editDormList);
        },
        closeDialogEditDormBtn() {
            this.dialogEditDormFormVisible = false
        },
        //点击删除
        delDormBtn(row) {
            this.$confirm('此操作将永久删除寝室信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //执行成功
                console.log(row);
                let data = {
                    id: row.d_id
                }
                let res = await delDorms(data);
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
        }
    },
    mixins: [mixins]

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