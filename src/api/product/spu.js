import request from "@/utils/request";

//获取Spu的列表数据  /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: "get", params: { category3Id } });

//获取Spu基本信息 /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' });

//获取品牌信息 /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: "get" });

//获取Spu图片接口 /admin/product/spuImageList/{spuId}
export const spuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取平台全部销售属性  /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: "get" });

//添加|修改 spu:添加与修改，携带给服务器的参数大致一样的，唯一的区别是是否携带id
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数带有id----修改spu
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
    } else {
        //携带的参数不带id---添加SPU
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
};

//删除Spu /admin/product/deleteSpu/{spuId}
export const SpuDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

//获取SkuForm的图片接口 /admin/product/spuImageList/{spuId}
export const reqSpuImageLIst = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取销售属性的接口  /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: "get" });

//获取平台属性的数据   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: "get" });

//添加Sku /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo });

//获取Sku列表的数据 /admin/product/findBySpuId/{spuId}
export const reqFindBySpuId = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })