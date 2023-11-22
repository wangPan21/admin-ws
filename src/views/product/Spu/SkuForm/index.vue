<template>
  <div>
    <el-form label-width="80px" :inline="false" size="normal">
      <el-form-item label="Spu名称:" v-model="spu.spuName">{{
        spu.spuName
      }}</el-form-item>

      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          v-model="skuInfo.price"
          type="number"
        ></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true" size="normal">
          <el-form-item
            :label="item.attrName"
            v-for="(item, index) in attrInfoList"
            :key="item.id"
          >
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                :label="items.valueName"
                :value="`${item.id}:${items.id}`"
                v-for="(items, index) in item.attrValueList"
                :key="items.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true" size="normal">
          <el-form-item
            :label="i.saleAttrName"
            v-for="(i, index) in spuSaleAttrList"
            :key="i.id"
          >
            <el-select placeholder="请选择" v-model="i.attrIdAndValueId">
              <el-option
                :label="is.saleAttrValueName"
                :value="`${i.id}:${is.id}`"
                v-for="(is, index) in i.spuSaleAttrValueList"
                :key="is.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          border
          stripe
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center">
          </el-table-column>

          <el-table-column
            prop="imgName"
            label="名称"
            width="230"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="prop" label="图片" align="center">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="200" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button
                type="success"
                size="mini"
                plain
                v-else
                @click="disChangeDefault(row)"
                >默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="Cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      //存储销售属性的数据
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      imageList: [], //收集图片的数据字段
      //父组件给予的值
      spu: {},
      skuInfo: {
        //第一类数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类数据：通过V-model双向绑定的数据
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        skuDefaultImg: "", //默认图片
        //第三类数据：自己收集，需要自己写代码
        //平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],
        //收集图片的数据
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          {
            saleAttrId: 0,
            saleAttrValueId: 0,
          },
          // {
          //   saleAttrName: "",
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
    };
  },
  methods: {
    //获取SkuFrom数据
    async getData(category1Id, category2Id, spu) {
      //收集父组件给予的数据
      this.skuInfo.spuName = spu.spuName;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.id = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //获取图片的数据
      let imageResult = await this.$API.spu.reqSpuImageLIst(spu.id);
      if (imageResult.code == 200) {
        let list = imageResult.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
      //获取销售属性的数据
      let attrResult = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (attrResult.code == 200) {
        this.spuSaleAttrList = attrResult.data;
      }
      // 获取平台属性的数据
      let infoResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (infoResult.code == 200) {
        this.attrInfoList = infoResult.data;
      }
    },

    //table表格复选框按钮的事件
    handleSelectionChange(params) {
      this.imageList = params;
    },

    //点击切换默认按钮
    changeDefault(row) {
      //图片列表数据的isDefault变为0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      //点击那个行的图片数据isDefault变为1
      row.isDefault = 1;
      //收集默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },

    //点击切换设为默认按钮
    disChangeDefault(row) {
      //图片列表数据的isDefault变为0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      //点击那个行的图片数据isDefault变为1
      row.isDefault = 0;
      //收集默认图片地址
    },

    //保存按钮的回调
    async saveSkuInfo() {
      //整理平台属性参数
      const { skuInfo, attrInfoList, spuSaleAttrList,imageList} = this;
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [ attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      //整理销售属性参数
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      //整理图片列表参数
      skuInfo.skuImageList = imageList.map(item=>{
        return{
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id,
        }
      })

      //发送axios请求，携带skuInfo参数传递给服务器
      let result = await this.$API.spu.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
          center: true,
        });
        this.$emit("showSku", 0);
      }
    },

    //取消按钮回调
    Cancel() {
      //自定义事件，让父组件切换场景
      this.$emit("showSku", 0);
      //清理数据
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>