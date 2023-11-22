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
          //最小值与最大值的设置
          min: 0,
          max: 100,
        },
        yAxis: {
          // 隐藏Y轴
          show: false,
          type: "category",
        },
        //系列
        series: [
          {
            //图表的形式
            type: "bar",
            data: [78],
            color: "yellowgreen",
            //柱状图的宽度
            barWidth: 20,
            //背景颜色的设置
            showBackground: true,
            //设置背景的颜色
            showBackgroundStyle: { color: "#eee" },
            //文本标签
            label:{
              show:true,
              // 改变文本的内容
              formatter:'|',
              //文本位置
              position:'right'
            }
          },
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
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