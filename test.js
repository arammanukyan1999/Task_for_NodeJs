// const fs = require("fs");
// const fetch = require("node-fetch");
// const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
// let defaultLink = "https://soccer365.ru";
// let k = [];
// let req = [];
// let t = 0;
// let status = 0
// const regex1 = new RegExp(/href="([^"]*)/);
// let getPageUrls = (link = defaultLink) => {
//   req.push(
//     new Promise((resolve, reject) => {
//       if (link.indexOf(defaultLink) != -1) {
//         fetch(link, {
//           headers: {
//             "Content-Type": "application/json",
//             "Accept-Encoding": "gzip, deflate, br",
//             "Accept": "*/*",
//             "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,hy;q=0.6",
//             "User-Agent":
//               "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
//           "accept" :
//               "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//             "Access-Control-Request-Headers":
//               "origin, x-requested-with, accept",
//           },
//         })
//           .then((response) => { return response.body
//             // if(k.indexOf(link) == -1){
//             //  (k.push(link)) 
//             // //  console.log(k);
            
//             // if ((response.status >= 200)||(response.status >= 200)) {
//             //   // console.log(link,'       ' ,response.status,'      ',t++);
//             //   return response.body;
//             // } else {
//             //   // console.log(link + '  ' + status,'      ',t++) 
//             //  return
//             // }}
//           })
//           // .catch((err) => {if (err) return} )
//           .then((res) =>
//             streamToString(res, function (myStr) {
//               //  console.log(link, "ttt", t++)
//               myStr.match(regex)?.map((el) => {
//                   console.log(el)
//                 // if (
//                 //   el.match(regex1)[1][0] == "/" &&
//                 //   el.match(regex1)[1][1] !== "/" &&
//                 //   el.match(regex1)[1][1] !== "#"
//                 // ) {
//                 //   el = link + el.match(regex1)[1];
//                 //   if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
//                 //   if (k.indexOf(el) == -1) {
//                 //     // k.push(el);
//                 //   }
//                 //   getPageUrls(el);
//                 // }
//               });
//               // resolve(k);
//             })
//           )
//           .catch((err) => reject(err));
//       }
//     })
//   );
// };

// var streamToString = (stream, callback) => {
//   var str = "";
//   stream?.on("data", function (chunk) {
//     str += chunk;
//   });
//   stream?.on("end", function () {
//     callback(str);
//   });
// };

// getPageUrls();

// Promise.all(req)
//   .then((res) => console.log(res), "a")
//   .finally(() => console.log("finish"));



const fs = require("fs");
const fetch = require("node-fetch");
const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
let defaultLink = "https://codepeckers.ru";
let k = [];
let req = [];
let t = 0;
let status = 0
const regex1 = new RegExp(/href="([^"]*)/);
let getPageUrls = (link = defaultLink) => {
  req.push(
    new Promise((resolve, reject) => {
      if (link.indexOf(defaultLink) != -1) {
        fetch(link)
          .then((response) => {
            if(k.indexOf(link) == -1){
             (k.push(link)) 
            //  console.log(k);
            if ((response.status >= 200)&&(response.status < 300)) {
              t++
              console.log(link,'       ' ,response.status,'      ');
              return response.body;
            } else {
              t++
              console.log(link + '  ' + response.status,'      ') 
             return
            }}
          })
          .catch((err) => {if (err) return} )
          .then((res) =>
            streamToString(res, function (myStr) {
              myStr.match(regex)?.map((el) => {
                if (
                  el.match(regex1)[1][0] == "/" &&
                  el.match(regex1)[1][1] !== "/" &&
                  el.match(regex1)[1][1] !== "#"
                ) {
                  el = defaultLink + el.match(regex1)[1];
                  if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                  getPageUrls(el);
                }  
                else if (el.match(regex1)[1].slice(0,defaultLink.length) == defaultLink){
                  el = el.match(regex1)[1]
                    if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                    getPageUrls(el);  
                  }
              });
              // resolve(k);
            })
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
  .then((res) => console.log(res), "a")
  .finally(() => console.log("finish"));
