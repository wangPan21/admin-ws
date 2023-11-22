//从data.json文件导入数据，里面包含一些静态数据或者配置信息。
const data = require('./data.json')
    //导出模块语句
module.exports = [{
    url: '/home/list', // 定义了这个路由处理器的URL路径。
    type: 'get', //定义了这个路由处理器的HTTP方法，方法类型是get。
    //接收一个参数config，并返回一个对象。这个函数定义了当URL路径和HTTP方法匹配到请求时应该如何响应。
    response: config => {
        const items = data.items //在response函数内部定义的一个变量。它从之前导入的data对象中获取items属性。
            //response函数的返回语句。它返回一个对象，该对象有两个属性：code和data。其中，code被设置为20000，而data被设置为之前导入的data对象。
        return {
            code: 20000,
            data
        }
    }
}]