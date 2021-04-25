const fs = require("fs");
const fetch = require("node-fetch");
const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
let defaultLink = "https://varks.am";
let k = [];
let req = [];

const regex1 = new RegExp(/href="([^"]*)/);
let getPageUrls = (link = defaultLink) => {
  req.push(
    new Promise((resolve, reject) => {
      if (link.indexOf(defaultLink) != -1) {
        fetch(link)
          .then((response) => response.body)
          .then((res) =>
            streamToString(res, function (myStr) {
              myStr.match(regex)?.map((el) => {
                if (
                  el.match(regex1)[1][0] === "/" &&
                  el.match(regex1)[1][1] !== "/"
                ) {
                  el = defaultLink + el.match(regex1)[1];
                  if (k.indexOf(el) == -1)
                    k.push(el);
                } else {
                  if(el.indexOf(defaultLink) !== -1){
                    if (k.indexOf(el) == -1)
                    k.push(el);
                  }
                }
              });
              resolve(k)
              
            })
          )
          .catch((err) => reject(err));
      }
    })
  );
};

var streamToString = (stream, callback) => {
  var str = "";
  stream.on("data", function (chunk) {
    str += chunk;
  });
  stream.on("end", function () {
    callback(str);
  });
};

getPageUrls();

Promise.all(req)
  .then((res) =>  console.log(res))
  .finally(() => console.log("finish"));
