<template>
  <div>
    <el-card style="margin: 20px 0px 0px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="showButton != 0"
      ></CategorySelect>
    </el-card>

    <!-- 展示三部分列表的解构 -->
    <el-card style="margin: 20px 0px 0px 0px">
      <!-- 展示Spu列表的结构 -->
      <div v-show="showButton == 0">
        <el-button
          type="primary"
          style="margin: 10px 0px 20px"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加Spu</el-button
        >

        <el-table style="width: 100%" border :data="records">
          <el-table-column label="序号" width="80" align="center" type="index">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="Spu名称"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="Spu描述"
            prop="description"
            align="center"
            width="300"
            style="display: flex; justify-content: space-around"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                style="margin: 0px 15px 0px 0px"
                icon="el-icon-plus"
                size="mini"
                title="添加Sku"
                @click="addSku(row)"
              ></el-button>

              <el-button
                type="warning"
                style="margin: 0px 15px 0px 0px"
                icon="el-icon-edit"
                size="mini"
                title="修改Spu"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                style="margin: 0px 15px 0px 0px"
                icon="el-icon-info"
                size="mini"
                title="查看当前Spu全部的Sku列表"
                @click="viewDialog(row)"
              ></el-button>

              <el-popconfirm
                :title="`删除 ${row.spuName}`"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  type="danger"
                  style="margin: 0px 0px 0px 0px"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除Spu"
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
          >
        </el-pagination>
      </div>

      <SpuForm v-show="showButton == 1" @showOff="offShow" ref="spu"></SpuForm>

      <SkuForm v-show="showButton == 2" @showSku="showSku" ref="sku"></SkuForm>
    </el-card>

    <!-- 对话框 -->
    <el-dialog
      :title="`${spu.spuName}-sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <!-- table展示sku的列表 -->
      <el-table :data="skuList" border stripe v-loading="loading">
        <el-table-column prop="skuName" label="名称" align="center"> </el-table-column>
        <el-table-column prop="price" label="价格"align="center"> </el-table-column>
        <el-table-column prop="weight" label="重量"align="center"> </el-table-column>
        <el-table-column  label="默认图片" align="center"> 
          <template slot-scope="{row, $index}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
  
<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";

export default {
  name: "Spu",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      records: [],
      category1Id: "",
      category2Id: "",
      category3Id: "",
      showButton: 0, //控制三级联动的名单
      dialogTableVisible: false, //控制对话框显示与隐藏
      spu: {},
      skuList: [], //存储的是sku列表的数据
      loading:true,
    };
  },

  methods: {
    //三级联动的自定义事件
    getCategoryId({ categoryId, level }) {
      // categoryId：获取一、二、三级id
      //level:为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        //清除二、三级id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        //清除三级id
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //获取SPU列表
        this.getSpuList();
      }
    },

    //获取SPU列表数据的方法
    async getSpuList() {
      const { page, limit, category3Id } = this;
      //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // pagination 分页器 点击切换回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },

    // pagination 分页器 展示数据条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },

    //添加Spu
    addSpu() {
      this.showButton = 1;
      //通知Spu发送请求
      this.$refs.spu.addSpuData(this.category3Id);
    },

    //修改某一个Spu
    editSpu(row) {
      this.showButton = 1;
      //获取子组件SpuForm子组件的信息,每次点击修改后自动刷新子组件界面
      this.$refs.spu.infoSpuForm(row);
    },

    //查看SKu按钮的回调
    async viewDialog(spu) {
      this.dialogTableVisible = true;
      //保存spu信息
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqFindBySpuId(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },

    //删除Spu按钮的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.SpuDeleteSpu(row.id);
      if (result.code == 200) {
        // 代表Spu个数大于1删除时停留在当前页，否则回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
        this.$message({
          type: "success",
          message: "删除成功",
          center: true,
        });
      }
    },

    //接受子组件SpuForm传值
    offShow({ value, flag }) {
      this.showButton = value;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else if (flag == "添加") {
        this.getSpuList();
      }
    },

    //添加Sku按钮回调
    addSku(row) {
      this.showButton = 2;
      //父组件调用子组件的方法，子组件发请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },

    //接受子组件SkuForm传值
    showSku(value) {
      this.showButton = value;
    },

    //关闭对话框的回调
    close(done){
      this.loading = true;
      //清除sku列表的数据
      this.skuList=[];
      //关闭对话框
      done();
    },
  },
  components: { SkuForm, SpuForm },
};
</script>
  
  <style>
</style>