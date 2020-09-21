import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let CardModule = {
  getCardList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/card/list`,
      data: datas
    });
  },
  updateCardInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/card/update`,
      data: datas
    });
  },
  changeCardInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/card/change`,
      data: datas
    });
  },
  getGinerList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/card/giner`,
      data: datas
    });
  }

}

export {
  CardModule
}
