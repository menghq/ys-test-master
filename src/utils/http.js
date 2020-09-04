import Vue from 'vue'
import axios from 'axios'
import router from "../router";
const apiUrl = process.env.API_HOST;
axios.defaults.timeout = 30000; // 超时时间

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}
function endLoading () {
  loading.close()
}
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

var HttpRequest = {
  getRequest ({
    url,
    data = {},
    method = "GET",
    contentType = "application/json",
    authorization = localStorage.getItem("authorization")
  }) {
    return new Promise((resolve, reject) => {
      this._getRequest(url, resolve, reject, data, method, contentType, authorization);
    });
  },
  _getRequest: function (url, resolve, reject, data = {}, method = "GET", contentType, authorization) {
    let format = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    showFullScreenLoading();
    axios({
      url: url,
      method: method,
      [format]: data,
      headers: {
        "Content-type": contentType,
        "Authorization": authorization
      },
    }).then(res => {
      hideFullScreenLoading();
      if (res.data.Success) {
        resolve(res);
      } else {
        resolve(res);
        if (res.data.Message) {
          if (res.data.err == 0) {
            this.$message({
              showClose: true,
              message: res.data.Message,
            });

          } else {
            this.$message({
              showClose: true,
              message: res.data.Message,
              type: 'error'
            });

          }
        }

      }
    }).catch((err) => {
      hideFullScreenLoading();
      const status = err.response.status;
      if (status && status === 403) {
        localStorage.removeItem('authorization');
        // that.$message({
        //   showClose: true,
        //   message: "登录超时，请重新登录。",
        //   type: 'error'
        // });
        router.push({ path: "/" });
      } else {
        // that.$message({
        //   showClose: true,
        //   message: "系统发生错误，请联系管理员。",
        //   type: 'error'
        // });
        reject(err);
        console.log("发生错误，请检查！" + err);
        console.log(err.response);
      }
    })
  },
  getExcel: function ({ url, data = {} }) {
    showFullScreenLoading();
    let authorization = localStorage.getItem("authorization");
    axios({
      url: url,
      method: "POST",
      data: data,
      responseType: 'blob',
      headers: {
        "Content-type": 'application/xls',
        "Authorization": authorization
      },
    }).then(res => {
      hideFullScreenLoading();
      let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob);

      downloadElement.href = href;

      downloadElement.download = 'download.xlsx';　　　　　　　　　　// xxx.xls/xxx.xlsx

      document.body.appendChild(downloadElement);

      downloadElement.click();

      document.body.removeChild(downloadElement);

      window.URL.revokeObjectURL(href);
    }).catch((err) => {
      hideFullScreenLoading();
      const status = err.response.status;
      if (status && status === 403) {
        localStorage.removeItem('authorization');
        // that.$message({
        //   showClose: true,
        //   message: "登录超时，请重新登录。",
        //   type: 'error'
        // });
        router.push({ path: "/" });
      } else {
        // that.$message({
        //   showClose: true,
        //   message: "系统发生错误，请联系管理员。",
        //   type: 'error'
        // });
        reject(err);
        console.log("发生错误，请检查！" + err);
        console.log(err.response);
      }
    })
  },
};

export {
  HttpRequest,
  apiUrl,
  axios
}
