<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>缴费记录管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入学生名字" style="width: 20%;margin-right: 1rem;"
                        clearable></el-input>
                    <el-button type="primary" plain>搜索</el-button>
                    <!-- <el-button type="primary" plain @click="addNotice">添加</el-button> -->
                </div>

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="province" label="缴费金额">
                    </el-table-column>
                    <el-table-column prop="city" label="缴费时间">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="delPayBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>

            </div>

            <!-- 编辑 -->
            <!-- <EditMainSub :dialogEditMainFormVisible="dialogEditMainFormVisible"
                @closeDialogEditMainBtn="closeDialogEditMainBtn"></EditMainSub> -->

            <!-- 数据可视化 -->
            <!-- <div class="charts-box">
                <div class="charts-title">
                    <div class="charts-box-left"></div>
                    <div class="charts-name">
                        <span>学生分布</span>
                    </div>
                </div>


            </div> -->
        </div>
    </div>
</template>

<script>
// import EditMainSub from '@/components/maintenance/EditMainSub.vue';
//查看子组件

export default {
    data() {
        return {
            // dialogEditMainFormVisible: false,
            searchInput: '',
            currentPage: 4,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            },]
        };
    },
    methods: {
        //点击编辑
        // editMainBtn() {
        //     this.dialogEditMainFormVisible = true
        // },
        // closeDialogEditMainBtn() {
        //     this.dialogEditMainFormVisible = false
        // },
        //点击删除
        delPayBtn() {
            this.$confirm('此操作将永久删除公告信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //执行成功

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },


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