<template>
  <div style="margin: 10px 0">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="first"></el-tab-pane>
          <el-tab-pane label="访问量" name="second"></el-tab-pane>
        </el-tabs>

        <!-- 头部右侧内容 -->
        <!--  v-model="value1" -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMon">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            class="date"
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="echarts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <div>门店{{ title }}排名</div>
            <ul v-show="show">
              <li
                v-for="(item, index) in this.listState.orderRank"
                :key="item.index"
              >
                <span :class="item.no <= 3 ? 'round' : 'round1'">{{
                  item.no
                }}</span>
                <span>{{ item.name }}</span>
                <span class="rounds">{{ item.money }}</span>
              </li>
            </ul>
            <ul v-show="!show">
              <li
                v-for="(item, index) in this.listState.userRank"
                :key="item.index"
              >
                <span :class="item.no <= 3 ? 'round' : 'round1'">{{
                  item.no
                }}</span>
                <span>{{ item.name }}</span>
                <span class="rounds">{{ item.money }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入eaharts
import * as echarts from "echarts";
import { mapState } from "vuex";
//引入dayjs
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "first",
      mycharts: "null",
      date: [], //收集日历的数据
      show: true,
    };
  },
  mounted() {
    //初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts);
    //配置数据
    this.mycharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
          color: this.activeName == "first" ? "yellowgreen" : "skyblue",
        },
      ],
    });
  },
  methods: {
    //获取今日日期
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },

    //获取本周日期
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },

    //获取本月日期
    setMon() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },

    //获取本年日期
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  computed: {
    title() {
      if (this.activeName == "first") {
        this.show = true;
      } else {
        this.show = false;
      }
      return this.activeName == "first" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    title() {
      //重新修改图标的配置数据
      //图标配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: this.title == "销售额" ? "yellowgreen" : "skyblue",
          },
        ],
      });
      this.title == "销售额" ? this.show == true : this.show == false;
    },
    listState() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.listState.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.listState.orderFullYear,
            color: "yellowgreen",
          },
        ],
      });
    },
  },
};
</script>

<style>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
  font-size: 15px;
}
.date {
  width: 200px;
  margin: 0 20px;
}
.echarts {
  width: 100%;
  height: 300px;
}
ul {
  width: 100%;
  height: 300px;
  padding: 0;
}
li {
  list-style: none;
  height: 8%;
  margin: 10px 0;
}
.round {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 20px;
  margin: 0 10px 0 0;
  background-color: #000000;
}
.rounds {
  float: right;
}
.round1 {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #000000;
  text-align: center;
  line-height: 20px;
  margin: 0 10px 0 0;
}
</style>