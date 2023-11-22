import request from "@/utils/request";

//sku列表的接口    /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' });

//sku上架 接口 /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' });

//sku下架 接口 /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' });

//获取sku详情的接口 /admin/product/getSkuById/{skuId}
export const reqGetSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' });

//删除Sku的接口  /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) => request({ url: `/admin/product/deleteSku/${skuId}`, method: 'delete' })