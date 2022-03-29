const API_URL = "https://newsfeedsmartapp.com/Tracking/api/webservices.php";
const CREATE_API_URL =
  "https://newsfeedsmartapp.com/Tracking/api/createUser.php";
  var user_id;
var Token;
// import 'core.js'
import CryptoJS from "crypto-js";
import 'base64-enc-dec';
const trackData = (data, fun) => {
  data = data || {};
  fun = fun || function () {};
  var t = new Date().getTime();
  data.t = t;
  var dAr = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  var dr = CryptoJS.enc.Base64.stringify(dAr);
  var hd = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));
  var shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.setHMACKey(Token.substr(5, 12), "TEXT");
  shaObj.update(hd + "." + dr);
  var hmac = shaObj.getHMAC("HEX");
  var k1 = CryptoJS.enc.Utf8.parse(hmac);
  var k2 = CryptoJS.enc.Base64.stringify(k1);
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var r1 = Math.floor(Math.random() * 6) + 1;
  var r2 = Math.floor(Math.random() * 7) + 2;
  for (var i = 0; i < r2; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  var f_str = String(r2) + String(r1) + k2.substr(0, r1) + text + k2.substr(r1);
  var out = hd + "." + dr + "." + f_str;
  var obj = {
    user_id: user_id,
    data: out,
  };

  $.ajax({
    url: API_URL,
    type: "POST",
    data: obj,
    dataType: "json",
    success: fun,
    error: function (data) {},
  });
};

async function ajaxData() {
  const result = await $.ajax({
    url: CREATE_API_URL,
    type: "POST",
    data: {
      action: "create_user",
    },
    success: function (data) {},
  });
  return result;
}
ajaxData().then((d) => {
  let data = JSON.parse(d);
  user_id = data.user_id;
  Token = data.game_key;
  console.log(user_id);
});
export default trackData;
