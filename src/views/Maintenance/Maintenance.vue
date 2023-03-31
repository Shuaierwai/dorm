<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>维修管理</span>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="student-operate">
                <div class="student-operate-left">
                    <el-input v-model="searchInput" placeholder="请输入维修内容" style="width: 20%;margin-right: 1rem;" clearable
                        @clear="clearBtn"></el-input>
                    <el-button type="primary" plain @click="searchBtn">搜索</el-button>
                    <!-- <el-button type="primary" plain @click="addNotice">添加</el-button> -->
                </div>

            </div>
            <!-- 表格 -->
            <div class="student-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="m_imgUrl" label="图片">
                        <template slot-scope="scope">
                            <img :src="'http://localhost:8880' + scope.row.m_imgUrl" alt="" width="120" height="60" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="m_content" label="维修内容">
                    </el-table-column>
                    <el-table-column prop="m_time" label="上报时间">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-switch :value="scope.row.m_state" :active-value=1 :inactive-value=0 disabled
                                active-text="已处理" inactive-text="未处理">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="s_name" label="上报学生">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="editMainBtn(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delMainBtn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="count"
                        layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
                    </el-pagination>
                </div>

            </div>

            <!-- 编辑 -->
            <EditMainSub :dialogEditMainFormVisible="dialogEditMainFormVisible"
                @closeDialogEditMainBtn="closeDialogEditMainBtn" :mainEditRow="mainEditRow" @render="render"></EditMainSub>

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
import EditMainSub from '@/components/maintenance/EditMainSub.vue';
//查看子组件
import mixins from '@/utils/minixs';
import dayjs from 'dayjs';
import { getMaintenance, delMain } from '@/api/maintenance/maintenanceApi'
export default {
    data() {
        return {
            dialogEditMainFormVisible: false,
            searchInput: '',
            tableData: [],
            pageTotal: null,
            mainEditRow: []
        };
    },
    components: {
        EditMainSub,
    },

    created() {
        this.render()
    },

    methods: {
        //获取维修数据
        async render() {
            let params = {
                count: this.count,
                page: this.currentPage,
                search: this.searchInput
            }
            let res = await getMaintenance(params)
            console.log(res);
            if (res.data.code == 200) {
                if (res.data.data.length == 0) {
                    this.$message({
                        message: '搜索的内容不存在',
                        type: 'warning'
                    });
                } else {
                    this.pageTotal = res.data.total;
                    console.log(res.data.data);
                    this.$message({
                        message: '获取维修信息成功！',
                        type: 'success'
                    });
                    res.data.data.forEach(item => {
                        item.m_time = dayjs(item.m_time).format("YYYY-MM-DD HH:mm:ss")
                    })
                    this.tableData = res.data.data
                }

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
        //点击编辑
        editMainBtn(row) {
            this.dialogEditMainFormVisible = true;
            this.mainEditRow = row
        },
        closeDialogEditMainBtn() {
            this.dialogEditMainFormVisible = false
        },
        //点击删除
        delMainBtn(row) {
            this.$confirm('此操作将永久删除公告信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //执行成功
                console.log(row);
                let params = {
                    id: row.m_id
                }
                let res = await delMain(params)
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

        // .charts-box {
        //     width: 96%;


        //     .charts-title {
        //         width: 100%;
        //         height: 4rem;
        //         background: #fff;
        //         // padding: 2rem;
        //         display: flex;
        //         justify-content: flex-start;
        //         align-items: center;

        //         .charts-box-left {
        //             width: 0.5rem;
        //             height: 100%;
        //             background: #6c33fe;
        //             border-radius: 1rem;
        //             margin-right: 1rem;


        //         }

        //         .charts-name {
        //             font-size: 2.5rem;
        //             font-weight: bold;
        //         }
        //     }


        // }
    }

}
</style>