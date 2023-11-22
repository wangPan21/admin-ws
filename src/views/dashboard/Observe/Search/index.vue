<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <div class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span>
              <i class="el-icon-more" data-toggle="dropdown"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 100px">
              <el-dropdown-item style="width: 100px; height: 20%"
                >黄金糕</el-dropdown-item
              >
              <el-dropdown-item style="width: 100px; height: 20%"
                >狮子头</el-dropdown-item
              >
              <el-dropdown-item style="width: 100px; height: 20%"
                >螺蛳粉</el-dropdown-item
              >
              <el-dropdown-item style="width: 100px; height: 20%"
                >双皮奶</el-dropdown-item
              >
              <el-dropdown-item style="width: 100px; height: 20%"
                >蚵仔煎</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="search-bottom">
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <lineChats></lineChats>
            </el-col>
            <el-col :span="12" :offset="0">
              <lineChats></lineChats>
            </el-col>
          </el-row>
          <!-- Tab表格 -->
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column
              label="排名"
              align="center"
              width="80"
              type="index"
            >
            </el-table-column>
            <el-table-column label="搜索关健字" align="center" width="180">
            </el-table-column>
            <el-table-column label="用户数" sortable align="center">
            </el-table-column>
            <el-table-column label="周涨幅" sortable align="center">
            </el-table-column>
          </el-table>

        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination layout="prev, pager, next" :total="1000"  class="pagination">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import lineChats from "./lineChats";
export default {
  data() {
    return {
      tableData: [{}, {}],
    };
  },
  components: {
    lineChats,
  },
};
</script>

<style>
.search-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.search-bottom {
  margin: 20px 0 0 0;
}
.pagination{
  float:right;
  height: 40px;
}
</style>