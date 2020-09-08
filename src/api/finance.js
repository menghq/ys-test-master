import {
  HttpRequest,
  apiUrl
} from "@/utils/http";

let FinanceModule = {
  getTransactionList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/transaction/list`,
      data: datas
    });
  },
  getWalletLogList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/walletLog/list`,
      data: datas
    });
  },
  addRechargeInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/walletLog/add`,
      data: datas
    });
  },
  getWithdrawList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/withdraw/list`,
      data: datas
    });
  },
  getWithdrawInfo: function (id) {
    return HttpRequest.getRequest({
      method: "GET",
      url: `${apiUrl}/withdraw/info/${id}`,
    });
  },
  updateWithdrawInfo: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/withdraw/update`,
      data: datas
    });
  },
  getStatementList: function (datas) {
    return HttpRequest.getRequest({
      method: "POST",
      url: `${apiUrl}/statement/list`,
      data: datas
    });
  },
}

export {
  FinanceModule
}