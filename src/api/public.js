import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let PublicModule = {
  getKitchenSelect: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/kitchen/select`,
    });
  },
  getFoodSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/food/select`,
      data: datas
    });
  },
  getSchoolSelect: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/school/select`
    });
  },
  getGradeSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/grade/select`,
      data: datas
    });
  },
  getClassSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/class/select`,
      data: datas
    });
  },
  getDinerSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/diner/select`,
      data: datas
    });
  },
  getSchoolKitchenSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/kitchen`,
      data: datas
    });
  },
}

export {
  PublicModule
}