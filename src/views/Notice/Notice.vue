<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>公告管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入公告编号" style="width: 20%;margin-right: 1rem;" clearable
                        @clear="clearBtn"></el-input>
                    <el-button type="primary" plain @click="searchBtn">搜索</el-button>
                    <el-button type="primary" plain @click="addNotice">添加</el-button>
                </div>

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="n_num" label="公告编号">
                    </el-table-column>
                    <el-table-column prop="n_title" label="公告标题">
                    </el-table-column>
                    <el-table-column prop="n_content" label="公告内容">
                    </el-table-column>
                    <el-table-column prop="n_date" label="公告创建日期">
                    </el-table-column>
                    <el-table-column prop="u_name" label="公告发布者">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="editNoticeBtn(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delNoticeBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="count"
                        layout="total, sizes, prev, pager, next, jumper" :total="tableDateTotal">
                    </el-pagination>
                </div>

            </div>

            <!-- 添加子组件 -->
            <AddNoticeSub :dialogAddNoticeFormVisible="dialogAddNoticeFormVisible"
                @closeDialogAddNotice="closeDialogAddNotice" @render="render"></AddNoticeSub>


            <!-- 编辑 -->
            <EditNotice :dialogEditNoticeFormVisible="dialogEditNoticeFormVisible"
                @closeDialogEditNoticeBtn="closeDialogEditNoticeBtn" :editRow="editRow" @render="render"></EditNotice>

            <!-- 数据可视化 -->
        </div>
    </div>
</template>

<script>
import AddNoticeSub from '@/components/notice/AddNoticeSub.vue';//添加子组件
import EditNotice from '@/components/notice/EditNoticeSub.vue'
//查看子组件
import mixins from '@/utils/minixs';
import { getNotice, delNotice } from '@/api/noticeApi/getNoticeApi'
import { toDate } from '@/utils/TimeFormat'

export default {
    data() {
        return {
            dialogAddNoticeFormVisible: false,
            dialogEditNoticeFormVisible: false,
            searchInput: '',
            tableDateTotal: null,
            tableData: [],
            editRow: [],
        };
    },
    components: {
        AddNoticeSub,
        EditNotice,
    },
    created() {
        this.render()
    },
    methods: {
        //x渲染函数
        async render() {
            let data = {
                count: this.count,
                page: this.currentPage,
                search: this.searchInput,
            }
            let res = await getNotice(data);
            console.log(res);
            if (res.data.code == 200) {
                //    this.tableData=res.data.data;
                res.data.data.forEach(item => {
                    item.n_date = toDate(item.n_date)
                })
                this.tableData = res.data.data
                this.tableDateTotal = res.data.total
            }
        },
        //点击搜索
        searchBtn() {
            this.render()
        },
        //点击清除
        clearBtn() {
            this.render()
        },
        //点击添加按钮
        addNotice() {
            this.dialogAddNoticeFormVisible = true
        },
        closeDialogAddNotice() {
            this.dialogAddNoticeFormVisible = false
        },
        //点击编辑
        editNoticeBtn(row) {
            this.dialogEditNoticeFormVisible = true;
            console.log(row);
            this.editRow = row
        },
        closeDialogEditNoticeBtn() {
            this.dialogEditNoticeFormVisible = false
        },
        //点击删除
        delNoticeBtn(row) {
            this.$confirm('此操作将永久删除公告信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //执行成功
                console.log(row);
                let data = {
                    id: row.n_id
                }
                let res = await delNotice(data)
                console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.render();
                }

                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        // }
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