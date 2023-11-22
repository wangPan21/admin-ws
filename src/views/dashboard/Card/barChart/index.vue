<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "barchart",
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    this.$nextTick(() => {
      //配置数据
      lineCharts.setOption({
        xAxis: {
          // 隐藏X轴
          show: false,
          type: "category",
        },
        yAxis: {
          // 隐藏Y轴
          show: false,
        },
        //系列
        series: [
          {
            //图表的形式
            type: "bar",
            data: [10, 7, 33, 22, 43, 54, 46, 23],
            color: "skyblue",
          },
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        tooltip:{},
      });
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>