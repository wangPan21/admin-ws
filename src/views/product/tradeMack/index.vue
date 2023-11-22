<template>
  <div class="">
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        prop="prop"
        type="index"
        label="序号"
        width="80"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width"
        align="center"
      >
        <!-- **作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="250" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="showEdit(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
         当前第几页、数据总条数、每一页展示的条数 连续页码数
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              当前第几页           :current-page="6"
              总页数               :total="99"
              每一页展示多少条数据  :page-size="3"
              分页器布局            layout 
              按钮数量，如果是9，总页码是7       :page-count="9"
              -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :pager-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->, sizes, total"
      style="margin-top: 20px"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      align="center"
    >
    </el-pagination>
    <!-- 对话框 
    :visible.sync 控制dialog的显示与隐藏-->
    <el-dialog
      :title="tmFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 文件上传成功时的钩子  :on-success-->
          <!-- 上传文件之前的钩子    :before-upload-->
          <!-- action   上传的地址 -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              上传头像图片大小不能超过 2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdataTradeMark()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMack",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      // 列表展示的数据
      list: [],
      dialogFormVisible: false,
      // 收集表单信息
      tmFrom: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        //品牌名称验证规则 required 必填设置  message 提示信息 trigger 用户行为的设置
        tmName: [
          { required: true, message: "请输商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传品牌logo" }],
      },
    };
  },
  //   组件挂载完毕发送请求
  mounted() {
    //获取列表数据
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      //解构出参数
      const { page, limit } = this;
      //当你向服务器发送请求时，这个函数需要携带参数，现在data中初始化两个字段，代表给服务器传递参数
      let result = await this.$API.trademark.reqTrademarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    // 分页器某一页需要展示数据条数发生变化时触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //添加品牌的按钮
    showDialog() {
      //清空数据
      this.tmFrom = { tmName: "", logoUrl: "" };
      this.dialogFormVisible = true;
    },
    //修改某一个品牌
    showEdit(row) {
      //row: 当前用户选中的这个品牌信息
      this.dialogFormVisible = true;
      // 将选中的商品信息展示出来 浅拷贝
      this.tmFrom = { ...row };
    },

    //删除品牌按钮
    delTradeMark(row){
      //弹框
      this.$confirm(`确定要删除${row.tmName}`, '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          //当用户点击确定按钮时触发
          let result = await this.$API.trademark.reqdelTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.page)
          } 
        }).catch(() => {
          //当用户点击取消按钮时触发
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });   
        });       
    },

    //文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      // res是上传成功后，返回前端的数据
      // file是上传成功后，服务器给前端返回的数据
      this.tmFrom.logoUrl = res.data;
    },

    // 上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //点击上传添加/修改按钮
    addOrUpdataTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          //发送添加/新增 请求
          let result = await this.$API.trademark.reqAddOrUpdataTradMark(this.tmFrom);
          if (result.code == 200) {
            this.$message({
              type:this.tmFrom.id?"warning":"success",
              message: this.tmFrom.id ? "修改品牌成功" : "添加品牌成功",
            });
            //  再次向服务器发送请求
            this.getPageList(this.tmFrom.id ? this.page : 1);
          } else {
            return Promise.reject(new Error("faile"));
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>