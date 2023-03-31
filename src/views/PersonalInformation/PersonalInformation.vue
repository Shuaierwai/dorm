<template>
    <div id="box">
        <div class="student">
            <!-- 标题 -->
            <div class="header-title">
                <div class="title-box"></div>
                <div class="title-name">
                    <span>个人信息</span>
                </div>
            </div>


            <!-- 表格 -->
            <div class="student-table">
                <el-descriptions class="margin-top" title="个人信息" :column="4" direction="vertical">
                    <el-descriptions-item label="用户名">{{ userName }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ tel }}</el-descriptions-item>
                    <el-descriptions-item label="账号" :span="2">{{ user }}</el-descriptions-item>
                    <el-descriptions-item label="备注">
                        <el-tag size="small">{{ type }}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>

            </div>


        </div>
    </div>
</template>

<script>

//查看子组件
import {getAdmin} from '@/api/userApi/getUserApi'
export default {
    data() {
        return {
            userName:'',
            tel:'',
            user:'',
            type:''
        }
    },
    components: {

    },
    created(){
      this.render()
    },
    methods: {
    async render(){
        let params={
           id:JSON.parse(sessionStorage.getItem('userId'))
        }
        console.log(params);
       let res=await getAdmin(params);
       console.log(res);
        if(res.data.code==200){
           console.log(res.data.data);
           this.userName=res.data.data[0].u_name;
           this.tel=res.data.data[0].u_tel;
           this.user=res.data.data[0].u_user;
           this.type=res.data.data[0].u_type==0?'超级管理员':'普通管理员';

        }
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