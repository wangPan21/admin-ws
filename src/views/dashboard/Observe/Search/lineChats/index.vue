<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1699690907790"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="18972"
        width="20"
        height="20"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          fill="#bfbfbf"
          p-id="18973"
        ></path>
      </svg>
    </div>
    <div class="main">
        <span class="main-title">12321</span>&nbsp;
        <span class="main-subtitle">17.1</span>
        <svg t="1699692278148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="10" height="10"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2585"></path></svg>
        <svg t="1699692452128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2786" width="10" height="10"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#1afa29" p-id="2787"></path></svg>
    </div>
    <div class="footer">
        <div class="charts" ref="charts"></div>
    </div>
    
  </div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
    data(){
        return{

        }
    },
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
            data: [10, 7, 43, 43, 53, 34],
            //拐点的透明度为0
            itemStyle: {
              opacity: 0,
            },
            //线条的样式  
            lineStyle:{  
                color:'skyblue',  
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
                            color:"skyblue",
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin: 10px 10px 10px 0;
}
.main-title{
    font-size: 20px;
    margin: 0 15px 0 0;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>