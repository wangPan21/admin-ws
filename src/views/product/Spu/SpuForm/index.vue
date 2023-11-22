<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input placeholder="请输入Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tmd.tmName"
            :value="tmd.id"
            v-for="(tmd, index) in tradeMarkList"
            :key="tmd.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Spu描述">
        <el-input
          type="textarea"
          placeholder="请输入Spu描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>

      <!-- on-preview:图片预览功能  :on-remove：图片删除功能   :on-success:图片上传成功-->
      <el-form-item label="Spu图片">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${Remaining.length}个未选择的属性`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="c.name"
            :value="`${c.id}:${c.name}`"
            v-for="(c, index) in Remaining"
            :key="c.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 0px 0px 0px 10px"
          :disabled="!attrIdAndAttrName"
          @click="addsaleAttr"
          >添加销售属性</el-button
        >
        <el-table border style="margin-top: 20px" :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="80"
            prop="prop"
            type="index"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="属性名"
            width="180"
            prop="saleAttrName"
            align="center"
          >
          </el-table-column>

          <!-- 展示sup自己的属性值   -->
          <el-table-column label="属性值名称列表" prop="prop" align="center">
            <template slot-scope="{ row, $index }">
              <!-- el-tag展示已有的属性值列表 -->
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                >{{ tag.saleAttrValueName }}
              </el-tag>
              <!-- el-input展示新增属性值  @keyup.enter.native="handleInputConfirm"-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>

          <el-table-column label="操作" prop="prop" width="140" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="spu.spuSaleAttrList.splice($index, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form-item style="margin-top: 20px">
          <el-button
            type="primary"
            size="default"
            style="margin-right: 10px"
            @click="addOrUpdateSpu"
            >保存</el-button
          >

          <el-button size="default" @click="cancle">取消</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      spu: {
        //三级分类的Id
        category3Id: 0,
        // 描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: "",
        //收集spu图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值的收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, //存储spu数据,返回给服务器
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //获取图片信息
      BaseSaleAttrList: [], //获取平台销售属性
      dialogImageUrl: "",
      dialogVisible: false,
      attrIdAndAttrName: "", //收集未选择的销售属性的id与名字
    };
  },

  computed: {
    //计算出还未选择的销售属性值
    Remaining() {
      //数组过滤的方法，可以从已有的数据当中过滤出用户需要的元素，并且返回一个新的数据
      let result = this.BaseSaleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值【真，假】
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },

  methods: {
    //照片墙图片删除某一个图片的回调 file:删除的那张图片 fileLista：照片墙删除后，剩下的其他图片
    handleRemove(file, fileList) {
      //对于已有的图片照片墙中显示的图片有name、url字段的，照片墙显示数据务必要有这两个属性
      //对于服务器而言则不需要这两个字段，所以提交给服务器的数据前，需要处理掉这两个字段
      this.spuImageList = fileList;
    },

    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //控制对话框显示与隐藏
      this.dialogVisible = true;
    },

    //照片墙上传成功的回调
    handSuccess(response, file, fileList) {
      //收集图片的信息
      this.spuImageList = fileList;
    },

    //发送请求
    async infoSpuForm(spu) {
      //获取Spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌信息
      let tradeResult = await this.$API.spu.reqTradeMarkList();
      if (tradeResult.code == 200) {
        this.tradeMarkList = tradeResult.data;
      }
      //获取图片信息
      let imageResuit = await this.$API.spu.spuImageList(spu.id);
      if (imageResuit.code == 200) {
        let listArr = imageResuit.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }
      //获取平台销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.BaseSaleAttrList = saleResult.data;
      }
    },

    //添加新的销售属性的回调
    addsaleAttr() {
      //已经收集需要添加的销售属性到了attrIdAndAttrName里
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //选择完毕后清空下拉框的值
      this.attrIdAndAttrName = "";
    },

    //添加属性值列表按钮的回调
    showInput(row) {
      //当点击添加销售属性值时由button变为input.$set变为响应式的数据
      //挂载在销售属性身上的响应式数据inputVisible控制着button与input的切换
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");

      // this.$nextTick((_) => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },

    //el-input失去焦点的事件
    handleInputConfirm(row) {
      //解构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性不能为空
      if (inputValue.trim() == "") {
        this.$message({
          type: "error",
          message: "销售属性值不能为空",
          center: true,
        });
        return;
      }
      //新增的销售属性不能重复
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!result) {
        this.$message({
          type: "error",
          message: "销售属性值不能重复",
          center: true,
        });
        return;
      }
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改inputVisible的值为false,由input转换为button
      row.inputVisible = false;
    },

    //保存按钮的回调
    async addOrUpdateSpu() {
      console.log(this.spu.id);
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片，需要携带imageName与imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (result.code == 200) {
        //提示
        this.$message({
          type: "success",
          message: this.spu.id ? "修改信息成功" : "添加信息成功",
        });
        //通知父组件回到场景0
        this.$emit("showOff", {
          value: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }else{
        return Promise.reject(new Error('faile'))
      }
      Object.assign(this._data, this.$options.data());
    },

    //点击添加Spu按钮，发送请求的函数
    async addSpuData(category3Id) {
      // 收集三级分类的id
      this.spu.category3Id = category3Id;
      //获取品牌信息
      let tradeResult = await this.$API.spu.reqTradeMarkList();
      if (tradeResult.code == 200) {
        this.tradeMarkList = tradeResult.data;
      }
      //获取平台销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.BaseSaleAttrList = saleResult.data;
      }
    },

    //点击取消按钮的回调
    cancle() {
      this.$emit("showOff", { value: 0, flag: "" });
      //清理数据，Object.assign：es6中新增的方法可以合并对象
      //组件实例this._data,可以操作data当中所有的响应式的数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>