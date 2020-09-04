import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let SchoolModule = {
  getSchoolKitchenSelect: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/kitchen`,
      data: datas
    });
  },
  addClassInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/class/add`,
      data: datas
    });
  },
  deleteClassInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/class/delete/${id}`,
    });
  },
  getSchoolList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/list`,
      data: datas
    });
  },
  getSchoolInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/school/info/${id}`,
    });
  },
  getSchoolConfigInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/school/config/${id}`,
    });
  },
  addSchoolInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/add`,
      data: datas
    });
  },
  updateSchoolInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/school/update`,
      data: datas
    });
  },
  deleteSchoolInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/school/delete/${id}`,
    });
  },
  getGradeList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/grade/list`,
      data: datas
    });
  },
  addGradeInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/grade/add`,
      data: datas
    });
  },
  updateGradeUpgrade: function () {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/grade/upgrade`
    });
  },
  deleteGradeInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/grade/delete/${id}`,
    });
  },
  getClassList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/class/list`,
      data: datas
    });
  },
  getDinerList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/diner/list`,
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
  addDinerInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/diner/add`,
      data: datas
    });
  },
  getDinerInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/diner/info/${id}`,
    });
  },
  updateDinerInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/diner/update`,
      data: datas
    });
  },
  deleteDinerInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/diner/delete/${id}`,
    });
  },
}

export {
  SchoolModule
}