<template>
  <div :id="id" style=" height: 300px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    props:{
        id:{
            type:String,
            require:true
        },
        xdata:{
            type:Array,
            require:true
        },
        ydata:{
            type:Array,
            require:true
        }
    },
  mounted() {
    var chartDom = document.getElementById(this.id)
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: '近7日销售总量统计',
        x: 'center',
        top: '20'
      },
      xAxis: {
        type: 'category',
        data: this.xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.ydata,
          type: 'bar'
        }
      ]
    }

    option && myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
</style>