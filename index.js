const fs = require("fs");
const fetch = require("node-fetch");
const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
let defaultLink = "https://google.com";
let k = [];
let req = [];
let t = 0;
let status = 0
const regex1 = new RegExp(/href="([^"]*)/);
let getPageUrls = (link = defaultLink) => {
  req.push(
    new Promise((resolve, reject) => {
      if (link.indexOf(defaultLink) != -1) {
        fetch(link, {
        })
          .then((response) => {
             return response.body
          })
          // .catch((err) => {if (err) return} )
          .then((res) =>
            streamToString(res, function (myStr) {
              //  console.log(link, "ttt", t++)

              myStr.match(regex)?.map((el) => {
                if (
                  el.match(regex1)[1][0] == "/" &&
                  el.match(regex1)[1][1] !== "/" &&
                  el.match(regex1)[1][1] !== "#"
                ) {
                  el = defaultLink + el.match(regex1)[1];
                  if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                  console.log(k);
                  if (k.indexOf(el) == -1) {
                    k.push(el);
                  }
                  getPageUrls(el);
                }  
                else if (el.match(regex1)[1].slice(0,defaultLink.length) == defaultLink){
                  el = el.match(regex1)[1]
                    // console.log(el.match(regex1)[1],'lllllllllllllllll');
                    if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                    if (k.indexOf(el) == -1) {
                      k.push(el);
                    }  
                     getPageUrls(el);

                     
                  }
              });
            }),
            // resolve(k)
          )
          .catch((err) => reject(err));
      }
    })
  );
};

var streamToString = (stream, callback) => {
  var str = "";
  stream?.on("data", function (chunk) {
    str += chunk;
  });
  stream?.on("end", function () {
    callback(str);
  });
};

getPageUrls();

Promise.all(req)
  .then((res) => console.log(res))
  .finally(() => console.log("finish"));
