import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let OrderModule = {
  getAssignDate: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/assign/date`,
    });
  },
  getAssignMenu: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/menu`,
      data: datas
    });
  },
  getAssignAllList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/all`,
      data: datas
    });
  },
  getAssignMealTimeList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/mealTime`,
      data: datas
    });
  },
  getAssignGradeList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/grade`,
      data: datas
    });
  },
  getAssignClassList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/class`,
      data: datas
    });
  },
  getAssignOrderList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/order`,
      data: datas
    });
  },
  getAssignKitchenList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/kitchen`,
      data: datas
    });
  },
  getAssignLockerList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/assign/list/locker`,
      data: datas
    });
  },
  getAssignCategory: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/assign/category`,
    });
  },
  getOrderList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/order/list`,
      data: datas
    });
  },
  getOrderExport: function (datas) {
    return HttpRequest.getExcel({
      url: `${apiUrl}/order/export`,
      data: datas
    });
  },
  getOrderInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/order/info/${id}`,
    });
  },
  addOrderInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/order/add`,
      data: datas
    });
  },
  updateOrderInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/order/update/${id}`,
    });
  },
  cancelOrderInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/order/cancel/${id}`,
    });
  },
  getSchoolKitchenSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/kitchen`,
      data: datas
    });
  },
  getHomeSummary: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/home`
    });
  },
  getAdminList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/admin/list`,
      data: datas
    });
  },
  getAdminInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/admin/info/${id}`,
    });
  },
  addAdminInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/admin/add`,
      data: datas
    });
  },
  updateAdminInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/admin/update`,
      data: datas
    });
  },
  deleteAdminInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/admin/delete/${id}`,
    });
  },
  getRangeWeekList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/dateRange/weekList`,
      data: datas
    });
  },
  getRangeMonthList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/dateRange/monthList`,
      data: datas
    });
  },
  getMenuList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/menu/list`,
      data: datas
    });
  },
  getMenuInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/menu/info/${id}`,
    });
  },
  getMenuFoodInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/menuFood/list/${id}`,
    });
  },
  getMenuSchoolInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/menu/school/${id}`,
    });
  },
  addMenuInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/menu/add`,
      data: datas
    });
  },
  updateMenuInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/menu/update`,
      data: datas
    });
  },
  deleteMenuInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/menu/delete/${id}`,
    });
  },
  updateMenuFoodInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/menuFood/update`,
      data: datas
    });
  },
  updateFoodInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/food/update`,
      data: datas
    });
  },
  deleteFoodInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/food/delete/${id}`,
    });
  },
  uploadFoodImg: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/food/upload`,
      data: datas
    });
  },
  updateAdminPassword: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/user/password`,
      data: datas
    });
  },
  getCommentList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/comment/list`,
      data: datas
    });
  },
  getCommentInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/comment/info/${id}`,
    });
  },
  updateCommentInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/comment/update`,
      data: datas
    });
  },
  importDiner: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/diner/import`,
      data: datas
    });
  },
  getKitchenList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchen/list`,
      data: datas
    });
  },
  getKitchenInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchen/info/${id}`,
    });
  },
  addKitchenInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchen/add`,
      data: datas
    });
  },
  updateKitchenInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchen/update`,
      data: datas
    });
  },
  getStopMealList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/stopMeal/list`,
      data: datas
    });
  },
  addStopMealInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/stopMeal/add`,
      data: datas
    });
  },
  updateStopMealInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/stopMeal/update/${id}`,
    });
  },
  getAttachmentList: function(datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/attachment/list`,
      data: datas
    });
  },
  getAttachmentDownload: function(id) {
    window.open(`${apiUrl}/attachment/download/${id}`, "_blank");
  },
  addAttachmentInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/attachment/add`,
      data: datas
    });
  },
  deleteAttachmentInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/attachment/delete/${id}`,
    });
  },
  getSchoolUserList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/schoolUser/list`,
      data: datas
    });
  },
  getSchoolUserInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/schoolUser/info/${id}`,
    });
  },
  addSchoolUserInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/schoolUser/add`,
      data: datas
    });
  },
  updateSchoolUserInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/schoolUser/update`,
      data: datas
    });
  },
  deleteSchoolUserInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/schoolUser/delete/${id}`,
    });
  },
  getKitchenUserList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchenUser/list`,
      data: datas
    });
  },
  getKitchenUserInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchenUser/info/${id}`,
    });
  },
  addKitchenUserInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchenUser/add`,
      data: datas
    });
  },
  updateKitchenUserInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchenUser/update`,
      data: datas
    });
  },
  deleteKitchenUserInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchenUser/delete/${id}`,
    });
  },
  getKitchenSchoolInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchen/school/${id}`,
    });
  },
  updateKitchenSchoolInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchen/school/update`,
      data: datas
    });
  },
  getKitchenLicenseList: function(datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchenLicense/list`,
      data: datas
    });
  },
  getKitchenLicenseDownload: function(id) {
    window.open(`${apiUrl}/kitchenLicense/download/${id}`, "_blank");
  },
  addKitchenLicenseInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/kitchenLicense/add`,
      data: datas
    });
  },
  deleteKitchenLicenseInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchenLicense/delete/${id}`,
    });
  },
  exportAssignKitchen: function (datas) {
    return HttpRequest.getExcel({
      url: `${apiUrl}/assign/export/kitchen`,
      data: datas
    });
  },
  exportAssignLocker: function (datas) {
    return HttpRequest.getExcel({
      url: `${apiUrl}/assign/export/locker`,
      data: datas
    });
  },
}

export {
  OrderModule
}