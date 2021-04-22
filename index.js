const fs = require("fs");
const fetch = require("node-fetch");
const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
const url = "https://www.dasparfum-beauty.de/en";


const regex1 = new RegExp(/href="([^"]*)/);
fetch(url)
  .then((response) => response.body)
  .then((res) =>
    streamToString(res, function (myStr) {
      myStr.match(regex).map((el) => {
        console.log(el.match(regex1)[1]);
      });
    })
  )
  .catch((err) => console.log(err));

var streamToString = function (stream, callback) {
  var str = "";
  stream.on("data", function (chunk) {
    str += chunk;
  });
  stream.on("end", function () {
    callback(str);
  });
};
