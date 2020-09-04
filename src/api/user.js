import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let UserModule = {
  //获取登录验证码 GET /api/order/list
  getUserLogin: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/user/login`,
      data: datas
    });
  },
  getUserLogout: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/user/logout`,
    });
  },
  getUserInfo: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/user/info`,
    });
  },
  updateUserInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/user/update`,
      data: datas
    });
  },
  //登录验证 POST /api/order/info
  getOrderInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/order/info/${id}`,
    });
  },
  // 退出 GET /api/SysLogin/Logout
  getLogout: function (datas) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/api/SysLogin/Logout`,
      data: datas
    });
  },
  //登录用户详情 GET /api/SysUser/GetModel/{id}
  getSystemUserProfile: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/api/SysUser/Get`
    });
  },
  //更新登录用户资料 POST /api/SysUser/UpdateBySelf
  updateSystemUserProfile: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/api/SysUser/UpdateBySelf`,
      data: datas
    });
  },
  //更新登录用户密码 GET /api/SysUser/UpdatePwd
  updateSystemUserPassword: function (datas) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/api/SysUser/UpdatePwd`,
      data: datas
    });
  },
}

export {
  UserModule
}