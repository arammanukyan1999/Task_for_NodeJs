const fs = require("fs");
const fetch = require("node-fetch");
const regex = new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
const url = "https://www.google.com";
let k = []

const regex1 = new RegExp(/href="([^"]*)/);
 getPageUrls = new Promise((resolve,reject)=>{
  fetch(url)
  .then((response) => response.body)
  .then((res) =>
    streamToString(res, function (myStr) {
      myStr.match(regex).map((el) => {
        if ((el.match(regex1)[1][0]) === '/' ){
          el=url+el.match(regex1)[1]
          k.push(el)
        } else if ((el.match(regex1)[1][0]) === 'h' ){
          k.push(el.match(regex1)[1])
        }
      });
     resolve(k);
    })
  )
  .catch((err) => reject(err));
 } ) 
 

var streamToString = (stream, callback) => {
  var str = "";
  stream.on("data", function (chunk) {
    str += chunk;
  });
  stream.on("end", function () {
    callback(str);
  });
};

getPageUrls.then((res) =>{
  console.log(res);
})
