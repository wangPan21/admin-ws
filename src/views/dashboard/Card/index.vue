<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="总销售额" count='￥1242433'>
            <template slot="charts">
                <span class="text">周同比&nbsp;&nbsp;56.67% <svg t="1699692278148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="10" height="10"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2585"></path></svg></span>
                <span class="text">日同比&nbsp;&nbsp;19.16%<svg t="1699692452128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2786" width="10" height="10"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#1afa29" p-id="2787"></path></svg></span>
            </template>
            <template slot="footer">
            <span>日销售额&nbsp;￥20000</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="访问量" count='88460'>
            <template slot="charts">
                <lineChart></lineChart>
            </template>Chart
            <template slot="footer">
            <span>日访问量&nbsp;2012</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="支付笔数" count='322000'>
            <template slot="charts">
                <barChart></barChart>
            </template>
            <template slot="footer">
            <span>转换率&nbsp;65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="运营活动效果" count='78%'>
            <template slot="charts">
                <progressChart></progressChart>
            </template>
            <template slot="footer">
                <span class="text">周同比&nbsp;&nbsp;12% <svg t="1699692278148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="10" height="10"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2585"></path></svg></span>
                <span class="text">日同比&nbsp;&nbsp;11%<svg t="1699692452128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2786" width="10" height="10"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#1afa29" p-id="2787"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from './lineChart';
import barChart from './barChart';
import progressChart from './progressChart';
export default {
  name: "card",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  },
};
</script>

<style>
.text{
    font-size: 15px;
}
</style>