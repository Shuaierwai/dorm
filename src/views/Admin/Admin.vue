<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>管理员管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入管理员姓名" style="width: 20%;margin-right: 1rem;" clearable
                        @clear="clearBtn"></el-input>
                    <el-button type="primary" plain @click="searchBtn">搜索</el-button>
                    <el-button type="primary" plain @click="addAdmin">添加</el-button>
                </div>

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="u_name" label="管理员名称">
                    </el-table-column>
                    <el-table-column prop="u_user" label="账号">
                    </el-table-column>
                    <el-table-column prop="u_password" label="密码">
                    </el-table-column>
                    <el-table-column prop="u_tel" label="电话">
                    </el-table-column>
                    <el-table-column prop="u_type" label="管理员类型">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="viewAdminClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="editAdminBtn(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delAdminBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="count"
                        layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
                    </el-pagination>
                </div>

            </div>

            <!-- 添加子组件 -->
            <AddAdnimSubcomponent :dialogAddAdminFormVisible="dialogAddAdminFormVisible"
                @closeDialogAddAdmin="closeDialogAddAdmin" @render="render"></AddAdnimSubcomponent>

            <!-- 点击查看 -->
            <ViewAdminSubcomponent :dialogViewAdminFormVisible="dialogViewAdminFormVisible"
                @closeDialogViewAdminBtn="closeDialogViewAdminBtn" :viewRow="viewRow"></ViewAdminSubcomponent>
            <!-- 编辑 -->
            <EditAdminSub :dialogEditAdminFormVisible="dialogEditAdminFormVisible"
                @closeDialogEditAdminBtn="closeDialogEditAdminBtn" :editRow="editRow" @render="render"></EditAdminSub>


        </div>
    </div>
</template>

<script>
import AddAdnimSubcomponent from '@/components/admin/AddAdnimSubcomponent.vue';//添加子组件
import ViewAdminSubcomponent from '@/components/admin/ViewAdminSubcomponent.vue';//查看子组件
import EditAdminSub from '@/components/admin/EditAdminSub.vue';
import mixins from '@/utils/minixs';
import { getAdmin, delAdmin } from '@/api/admin/Admin'
export default {
    data() {
        return {
            dialogAddAdminFormVisible: false,
            dialogViewAdminFormVisible: false,
            dialogEditAdminFormVisible: false,
            searchInput: '',
            dataTotal: null,
            tableData: [],
            viewRow: [], //查看管理员信息
            editRow: [], //编辑管理员信息
        };
    },
    components: {
        AddAdnimSubcomponent,
        EditAdminSub,
        ViewAdminSubcomponent
    },

    created() {
        this.render()
    },
    methods: {
        //渲染数据
        async render() {
            let data = {
                count: this.count,
                page: this.currentPage,
                search: this.searchInput
            }
            let res = await getAdmin(data)
            console.log(res);
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: '获取管理员成功!'
                });
                this.dataTotal = res.data.total
                res.data.data.forEach(item => {
                    item.u_type == 0 ? item.u_type = '超级管理员' : item.u_type = '普通管理员'
                })
                this.tableData = res.data.data
                return
            }
            if (res.data.code == 404) {
                this.$message({
                    message: '搜索的名字不存在！',
                    type: 'warning'
                });
                return
            }
        },
        //点击搜索
        searchBtn() {
            console.log(this.searchInput);
            this.render()
        },
        clearBtn() {
            this.render()
        },
        //点击添加按钮
        addAdmin() {
            this.dialogAddAdminFormVisible = true
        },
        closeDialogAddAdmin() {
            this.dialogAddAdminFormVisible = false
        },
        //点击查看
        viewAdminClick(row) {
            this.dialogViewAdminFormVisible = true;
            console.log(row);
            this.viewRow = row
        },
        closeDialogViewAdminBtn() {
            this.dialogViewAdminFormVisible = false;
        },
        //点击编辑
        editAdminBtn(row) {
            this.dialogEditAdminFormVisible = true;
            this.editRow = row;
        },
        closeDialogEditAdminBtn() {
            this.dialogEditAdminFormVisible = false
        },
        //点击删除
        delAdminBtn(row) {
            this.$confirm('此操作将永久删除该管理员信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //执行成功
                //  console.log(row.u_id);
                let params = {
                    id: row.u_id
                }
                let res = await delAdmin(params)
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

    // handleChange(file, fileList) {
    //     this.fileList = fileList.slice(-3);
    // },
    // handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    // }

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