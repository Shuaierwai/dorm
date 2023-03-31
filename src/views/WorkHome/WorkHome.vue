<template>
    <div id="work-content">
        <!-- header 卡片-->
        <div class="header-card">
            <div class="header-card-item">
                <div class="header-card-item-left">
                    <div class="student-title">
                        <span>学生人数(人)</span>
                    </div>
                    <div class="student-num">
                        <span>{{ stuNumTotal }}</span>
                    </div>
                </div>
                <div class="header-card-item-right">
                    <i class="el-icon-user" style="font-size: 5rem;color: #9f93ff;"></i>
                </div>
            </div>
            <div class="header-card-item">
                <div class="header-card-item-left">
                    <div class="student-title">
                        <span>楼宇数量(个)</span>
                    </div>
                    <div class="student-num">
                        <span>{{ buildingTotal }}</span>
                    </div>
                </div>
                <div class="header-card-item-right">
                    <i class="el-icon-office-building" style="font-size: 5rem;color: #9f93ff;"></i>
                </div>
            </div>
            <div class="header-card-item">
                <div class="header-card-item-left">
                    <div class="student-title">
                        <span>寝室数量(间)</span>
                    </div>
                    <div class="student-num">
                        <span>{{ dormTotal }}</span>
                    </div>
                </div>
                <div class="header-card-item-right">
                    <i class="el-icon-house" style="font-size: 5rem;color: #9f93ff;"></i>
                </div>
            </div>
            <div class="header-card-item">
                <div class="header-card-item-left">
                    <div class="student-title">
                        <span>宿管人数(人)</span>
                    </div>
                    <div class="student-num">
                        <span>{{ adminTotal }}</span>
                    </div>
                </div>
                <div class="header-card-item-right">
                    <i class="el-icon-help" style="font-size: 5rem;color: #9f93ff;"></i>
                </div>
            </div>
        </div>
        <!-- header 第二层卡片 -->
        <div class="header-card-two">
            <div class="header-card-two-item">
                <div class="card-two-item-left">
                    <!-- 右边图标 -->
                    <div class="card-two-item-left-circle">
                        <i class="el-icon-tickets" style="font-size: 3rem;color: #fff;"></i>
                    </div>
                </div>
                <!-- 左边文字 -->
                <div class="card-two-item-right">
                    <div class="dorm-num">
                        <span>{{ noticeTotal }}</span>
                    </div>
                    <div class="dorm-notice">
                        <span>寝室公告数量</span>
                    </div>
                </div>
            </div>

            <div class="header-card-two-item">
                <div class="card-two-item-left">
                    <!-- 右边图标 -->
                    <div class="card-two-item-left-circle" style="background: #1C94FF;">
                        <i class="el-icon-first-aid-kit" style="font-size: 3rem;color: #fff;"></i>
                    </div>
                </div>
                <!-- 左边文字 -->
                <div class="card-two-item-right">
                    <div class="dorm-num">
                        <span>0</span>
                    </div>
                    <div class="dorm-notice">
                        <span>待处理维修数量</span>
                    </div>
                </div>
            </div>

            <div class="header-card-two-item">
                <div class="card-two-item-left">
                    <!-- 右边图标 -->
                    <div class="card-two-item-left-circle" style="background: #2671FF;">
                        <i class="el-icon-school" style="font-size: 3rem;color: #fff;"></i>
                    </div>
                </div>
                <!-- 左边文字 -->
                <div class="card-two-item-right">
                    <div class="dorm-num">
                        <span>{{ arrearsDorm }}</span>
                    </div>
                    <div class="dorm-notice">
                        <span>欠费寝室数量</span>
                    </div>
                </div>
            </div>


        </div>
        <!-- 可视化图表展示和公告展示 -->
        <div class="chart-box">
            <div class="chart" id="chart2">

            </div>
            <!-- 公告 -->
            <div class="notice">
                <i class=" el-icon-s-flag" style="font-size: 2rem;"></i>
                <span class="notice-title"> 公告通知</span>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="item in noticeList" :key="item.n_id" :title="item.n_title" :name="item.n_id">
                        <div>{{ item.n_content }}</div>
                        <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                    </el-collapse-item>

                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
import { getStudents, getBuilding, getClass } from '@/api/studentApi/getStudentsApi'
import { getUser } from '@/api/userApi/getUserApi'
import { getDorms } from '@/api/dormApi/getDormApi'
import { getNotice } from '@/api/noticeApi/getNoticeApi'
//映入图表第三方工具

export default {
    name: 'workHome',
    data() {
        return {
            activeName: '1',
            stuNumTotal: '',
            buildingTotal: '',
            adminTotal: '',
            dormTotal: '',
            noticeTotal: '',
            noticeList: [],//公告个数
            classList: [],//班级的个数
            arrearsDorm:''//欠费寝室
        };
    },
    created() {
        this.render()
        this.getBuildingNum()
        this.getUserNum()
        this.getDormNum()
        this.getNoticeNum()
        this.getClassNum()
    },
    mounted() {
        console.log(this.stuNumTotal);
        setTimeout(() => {
            const charts = this.$echarts.init(document.getElementById('chart2'));
            charts.setOption({
                title: {
                    text: '概述',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['学生', '楼宇', '寝室', '宿管', '班级'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%', //this.adminTotal
                        data: [this.stuNumTotal, this.buildingTotal, this.dormTotal, {
                            value: this.adminTotal,
                            itemStyle: {
                                color: '#a90000'
                            }
                        }, this.classList,]
                    }
                ]
            });
        }, 1000)

    },
    methods: {
        //获取学生人数
        async render() {
            let data = {
                search: '',
                count: 5,
                page: 1
            };
            let res = await getStudents(data)
            if (res.data.code == 200) {
                this.stuNumTotal = res.data.total
            }
            console.log(this.stuNumTotal);
        },

        async getBuildingNum() {
            let res = await getBuilding()
            // console.log(res);
            if (res.data.code == 200) {
                this.buildingTotal = res.data.data.length
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
            // console.log(res);
            if (res.data.code == 200) {
                this.adminTotal = res.data.total
            }
        },
        //获取
        async getDormNum() {
            let data={
                count:5,
                page:1,
                search:''
            }
            let res = await getDorms(data)
            console.log('res',res);
            if (res.data.code == 200) {
                this.dormTotal = res.data.data.length;
                let list=res.data.data.filter(item=>{
                    return item.d_state==1
                })
                this.arrearsDorm=res.data.data.length-list.length
                console.log(this.dormTotal );
            }
        },
        //获取公告
        async getNoticeNum() {
            let data = {
                count: 5,
                page: 1,
                search: ''
            }
            let res = await getNotice(data)
            console.log(res);
            if (res.data.code == 200) {
                this.noticeTotal = res.data.data.length;
                this.noticeList = res.data.data;
            }
        },
        //获取班级
        async getClassNum() {
            let res = await getClass()
            console.log(res);
            if (res.data.code == 200) {
                this.classList = res.data.data.length
            }
        }


    },
    computed: {

    },
}

</script>

<style lang="less" scoped>
#work-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .header-card {
        width: 94%;
        height: 18rem;
        // background: red;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-card-item {
            width: 22%;
            height: 80%;
            border-radius: 1rem;
            background: #fafafa;
            background-image: url('@/assets/images/card1.png');
            background-size: cover;
            display: flex;
            justify-content: center;
            align-content: center;

            .header-card-item-left {
                width: 60%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .student-title {
                    font-size: 1.2rem;
                    // transform: scale(0.9,0.9);
                    color: #ffffff;
                }

                .student-num {
                    margin-top: 2rem;
                    font-size: 3.5rem;
                    font-weight: bolder;
                    color: #ffffff;
                }
            }

            .header-card-item-right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            // background: red;
            &:nth-of-type(2) {
                background-image: url('@/assets/images/card2.png');
            }

            &:nth-of-type(3) {
                background-image: url('@/assets/images/card3.png');
            }

            &:nth-of-type(4) {
                background-image: url('@/assets/images/card4.png');
            }
        }
    }

    .header-card-two {
        width: 94%;
        height: 18rem;
        // background: red;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-card-two-item {
            width: 30%;
            height: 85%;
            border-radius: 1rem;
            background: #ffffff;
            // height: 18rem;
            // background: black;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .card-two-item-left {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .card-two-item-left-circle {
                    width: 10rem;
                    height: 10rem;
                    border-radius: 50%;
                    background: #6c33fe;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .card-two-item-right {
                width: 50%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .dorm-num {
                    font-size: 3.5rem;
                    font-weight: bolder;
                }


                .dorm-notice {
                    font-size: 1.6rem;
                    font-weight: 600;
                }
            }
        }
    }

    .chart-box {
        width: 94%;
        height: 50rem;
        display: flex;
        justify-content: space-between;
        align-content: center;

        // background: red;
        .chart {
            width: 70rem;
            height: 40rem;
            background: #fff;
        }

        .notice {
            width: 60rem;
            height: 40rem;
            background: #fff;
            border-radius: 1rem;

            .notice-title {
                font-size: 2rem;
                font-weight: bolder;
                display: inline-block;
                margin: 1rem 0;

            }

        }
    }

}
</style>