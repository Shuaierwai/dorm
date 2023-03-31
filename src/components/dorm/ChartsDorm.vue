<template>
    <div class="chartsStudent">

        <div class="student-charts-box">
            <div id="student-charts" class="students-charts-left"></div>
            <div id="student-charts2" class="students-charts-box-right"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['stuNumTotal','tableDataTotal','userNumTotal','buildingTotal','normalDormList','arrearsDorm'],
    data() {
        return {

        }
    },

    mounted() {
       setTimeout(()=>{
        const charts = this.$echarts.init(document.getElementById('student-charts'));
        const charts2 = this.$echarts.init(document.getElementById('student-charts2'));

        charts.setOption({
            title: {
                text: '宿舍概述',
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
                    data: ['寝室', '楼宇', '学生', '宿管'],
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
                    barWidth: '60%',
                    data: [this.tableDataTotal.length, this.buildingTotal, this.stuNumTotal,this.userNumTotal]
                }
            ]
        });
        charts2.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.normalDormList, name: '未欠费' },
                        { value: this.arrearsDorm, name: '已欠费' },

                    ]
                }
            ]
        });
       },1000)

    },

}
</script>

<style scoped lang="less">
.student-charts-box {
    display: flex;
    justify-content: space-between;

    .students-charts-left,
    .students-charts-box-right {
        width: 50%;
        height: 40rem;
        margin-top: 2rem;
        text-align: center;
        background: #fff;

    }
}
</style>