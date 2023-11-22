//该模块主要获取品牌管理的模块
import request from '@/utils/request';
//获取品牌列表接口  /admin/product/baseTrademark/{page}/{limit}
export const reqTrademarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

//新增品牌  /admin/product/baseTrademark/save 
//修改品牌   /admin/product/baseTrademark/update 将这两个接口封装成一个函数
export const reqAddOrUpdataTradMark = (tradeMark) => {
    //带给服务器的数据需要id ---修改
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: "put", data: tradeMark });
    } else {
        //带给服务器的数据不需要id ---新增
        return request({ url: '/admin/product/baseTrademark/save', method: "post", data: tradeMark });

    }
}

//删除品牌 /admin/product/baseTrademark/remove/{id}
export const reqdelTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: "delete" });