//将product里四个模块请求接口统一暴漏
import * as trademark from "./product/trademark";
import * as attr from "./product/attr";
import * as sku from "./product/sku";
import * as spu from "./product/spu";
import * as permission from "./acl/permission";
import * as role from "./acl/role";
import * as user from "./acl/user";

//对外暴漏
export default {
    trademark,
    attr,
    sku,
    spu,
    permission,
    role,
    user
}