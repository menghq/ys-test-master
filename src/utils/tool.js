// 获取 当天 日期 周
export function getDatePicker() {
    var todayDate = new Date();
    var date = todayDate.getDate();
    var month= todayDate.getMonth() +1;
    var year= todayDate.getYear();
    var dateweek = "";
    if(navigator.appName == "Netscape"){
        dateweek = dateweek + (1900+year) + "年" + month + "月" + date + "日 ";
    }

    if(navigator.appVersion.indexOf("MSIE") != -1){
        dateweek = dateweek + year + "年" + month + "月" + date + "日 ";
    }
    switch(todayDate.getDay()){
        case 0:dateweek += "星期日";break;
        case 1:dateweek += "星期一";break;
        case 2:dateweek += "星期二";break;
        case 3:dateweek += "星期三";break;
        case 4:dateweek += "星期四";break;
        case 5:dateweek += "星期五";break;
        case 6:dateweek += "星期六";break;
    }
    return dateweek;
}

// 获取14天 日期 周
export function getDateWeek() {/* 得到当前日期的时间戳 */
    const timestamp = Date.now()
    // const timestamp = new Date(2019, 7, 30, 0, 0, 0, 0).getTime()
    const dateWeek = Array.from(new Array(14)).map((_, i) => {
    /* 得到当前周每一天的时间戳 */
        const weekTimestamp = new Date(timestamp + i * 24 * 60 * 60 * 1000)

        // const date = String(weekTimestamp.getMonth() + 1).padStart(2, '0') + '.' +
        const date = String(new Date(weekTimestamp).getDate()).padStart(2, '0')

        /* 得到周几后转换 */
        let week = weekTimestamp.getDay()
        switch (week) {
            case 0:
            week = '周日'
            break
            case 1:
            week = '周一'
            break
            case 2:
            week = '周二'
            break
            case 3:
            week = '周三'
            break
            case 4:
            week = '周四'
            break
            case 5:
            week = '周五'
            break
            case 6:
            week = '周六'
            break
        }
        let wholeDate = String(weekTimestamp.getFullYear()).padStart(2, '0') + '-' +String(weekTimestamp.getMonth() + 1).padStart(2, '0') + '-' + String(new Date(weekTimestamp).getDate()).padStart(2, '0') + ' ' + week;
        return {
            date,
            week,
            wholeDate
        }
    })
　　return dateWeek;

}
// 转时间戳
export function timestamp(time) {
    return Date.parse(time)
}

 // 下载图片的方法
 export function downloadIamge(imgsrc, name) {//下载图片地址和图片名
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}

export function formatTime(date) {
  /* 从Date对象（标准时间格式）返回对应数据 */
  var date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return year + '-' + month + '-' + day;
}

// 导出的方法  tHeader => 设置Excel的表格第一行的标题  filterVal => 对象的属性key值 被导出listData => 导出数据  => 导出(文件)名称
export function outExportExcel(tHeader = [], filterVal = [], listData = [], exportName = new Date().getTime()) {
  require.ensure([], () => {
    // 注意这个Export2Excel路径
    const { export_json_to_excel } = require('@/components/excel/Export2Excel');
    const data =  listData.map(v => filterVal.map(j => v[j]));
    export_json_to_excel(tHeader, data, exportName);
  });
}


