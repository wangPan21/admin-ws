<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header" class="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="chartsa" ref="charts"></div>
      </div>
    </el-card>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "视频",
        subtext: 1848,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          //线
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "电影" },
            { value: 580, name: "电子邮件" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
    //绑定事件

    mychart.on("mouseover",(params)=>{
        //获取鼠标移上去那条数据
        const {name,value} = params.data;
        //重新设置标题
        mychart.setOption({
          title:{
            text:name,
            subtext:value
          }
        })
    });
  },
};
</script>

<style>
.category-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.chartsa {
  width: 100%;
  height: 300px;
}
</style>