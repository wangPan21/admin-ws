<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "linechart",
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
            type: "line",
            data: [10, 7, 33, 22, 43, 34],
            //拐点的透明度为0
            itemStyle: {
              opacity: 0,
            },
            //线条的样式  
            lineStyle:{  
                color:'purple',  
            },  
            smooth: true,
            //区域填充颜色
            areaStyle:{
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[
                        {
                            offset:0,
                            color:"purple",
                        },{
                            offset:1,
                            color:"#fff",
                        }
                    ]
                },
                global:false,
            },
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