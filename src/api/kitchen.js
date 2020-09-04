import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let KitchenModule = {
  getSchoolKitchenSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/kitchen`,
      data: datas
    });
  },
  getFoodList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/food/list`,
      data: datas
    });
  },
  getFoodInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/food/info/${id}`,
    });
  },
  addFoodInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/food/add`,
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
}

export {
  KitchenModule
}