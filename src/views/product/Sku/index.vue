<template>
  <div>
    <!-- 表格 -->
    <el-table border stripe :data="records">
      <el-table-column
        prop="prop"
        label="序号"
        align="center"
        type="index"
        width="70"
      >
      </el-table-column>
      <el-table-column prop="skuName" label="名称" align="center" width="100">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" align="center">
      </el-table-column>
      <el-table-column label="默认图片" align="center" width="180">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" align="center" width="100">
      </el-table-column>
      <el-table-column prop="prop" label="操作" align="center" width="250">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-top"
            v-if="row.isSale == 0"
            @click="onSale(row)"
            title="上架"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-bottom"
            v-else
            title="下架"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
            title="修改"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看详情"
            @click="getSkuById(row)"
          ></el-button>

          <el-popconfirm :title="`删除 ${row.skuName}`" class="el-buttona" @onConfirm="deleteSku(row)">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              title="删除"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(item, index) in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-right: 10px"
            >
              {{ item.attrId }}-{{ item.valueId }}
            </el-tag>
          </template>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
  
  <script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 6,
      total: 0,
      records: [],
      isSale: 1,
      //存储sku的信息
      skuInfo: {},
      drawer: false, //控制抽屉的开关
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    // pagination 分页器 点击切换回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },

    // pagination 分页器 展示数据条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },

    //获取Sku列表的数据方法
    async getSkuList() {
      // 解构数据
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    //上架按钮的回调
    async onSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({
          type: "success",
          message: "上架成功",
          center: true,
        });
      }
    },

    //下架按钮的回调
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
          center: true,
        });
      }
    },

    //修改按钮的回调
    edit() {
      this.$message({
        message: "功能正在开发中",
        center: true,
      });
    },

    //查看详情按钮的回调
    async getSkuById(row) {
      let result = await this.$API.sku.reqGetSkuById(row.id);
      if (result.code == 200) {
        this.drawer = true;
        this.skuInfo = result.data;
      }
    },

    //删除按钮的回调
    async deleteSku(row) {
      let result = await this.$API.sku.reqDeleteSku(row.id);
      if (result.code == 200) {
        this.getSkuList();
        this.$message({
          type:'success',
          message:'删除成功',
          center:true
        })
      }
    },
  },
};
</script>
  
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: bolder;
}
.el-col {
  margin: 10px 10px;
}
.el-buttona {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>