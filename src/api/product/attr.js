//平台属性管理模块请求文件
import request from '@/utils/request';

//获取一级分类接口 /admin/product/getCategory1
export const reqCategory1 = () => request({ url: "/admin/product/getCategory1", method: "get" });

//获取二级分类接口 /admin/product/getCategory2/{category1Id}
export const reqCategory2 = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: "get" });

//获取三级分类接口 /admin/product/getCategory3/{category2Id}
export const reqCategory3 = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: "get" });

//获取平台属性接口    /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrlist = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

//添加属性与属性值接口  /admin/product/saveAttrInfo
export const reqSavelist = (data) => request({ url: '/admin/product/saveAttrInfo', method: "post", data })