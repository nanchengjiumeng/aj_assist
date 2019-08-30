const AipOcrClient = require("baidu-aip-sdk").ocr;
const fs = require("fs");
const path = require("path");

// 设置APPID/AK/SK
var APP_ID = "17144315";
var API_KEY = "qXMycXDMnGCBdbOmHgUZ2EGl";
var SECRET_KEY = "WxUBw8q0wo3Rzx9oiOAXcqzVbr8Otetq";

var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

async function gsValue(path__) {
  var image;
  try {
    image = fs.readFileSync(path__).toString("base64");
  } catch (e) {
    console.log(e);
  }

  // 调用通用文字识别, 图片参数为本地图片
  return client
    .generalBasic(image)
    .then(function(result) {
      console.log(JSON.stringify(result));
      var words_result = result.words_result;
      var res = false;
      var regYD = /(移动速度).*\+([0-9]+)%/;
      var regGS = /(攻击速度).*\+([0-9]+)%/;
      words_result.forEach(item => {
        var matched_gs = item["words"].match(regGS);
        var matched_yd = item["words"].match(regYD);
        if (matched_gs) {
          res = {};
          res[matched_gs[1]] = Number(matched_gs[2]) / 10;
        }
        if (matched_yd) {
          res = {};
          res[matched_yd[1]] = Number(matched_yd[2]) / 10;
        }
      });
      return res;
    })
    .catch(function(err) {
      // 如果发生网络错误
      console.log(err);
    });
}

module.exports = {
  gsValue
};
