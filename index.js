
const fs = require("fs");
const fetch = require("node-fetch");
const regexForATag= new RegExp(/<a[\s]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/g);
let defaultLink = "https://hexometer.com";
let uniqueLinks = [];
let serial = 0;
const regexForHref = new RegExp(/href="([^"]*)/);
let getPageUrls = (link = defaultLink) => {
      if (link.indexOf(defaultLink) != -1) {
        fetch(link)
          .then((response) => {
            if(uniqueLinks.indexOf(link) == -1){
             (uniqueLinks.push(link)) 
              console.log("\x1b[32m", link  , "\x1b[34m",'  Status`' ,response.status,"\x1b[31m",'Serial` ', "\x1b[36m",serial++);
              return response.body;
          }
          }) 
          .catch((err) => {if (err) return} )
          .then((res) =>
            streamToString(res, function (myStr) {
              myStr.match(regexForATag)?.map((el) => {
                if (
                  el.match(regexForHref)[1][0] == "/" &&
                  el.match(regexForHref)[1][1] !== "/" &&
                  el.match(regexForHref)[1].indexOf('#') == -1
                ) {
                  el = defaultLink + el.match(regexForHref)[1];
                  if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                  getPageUrls(el);
                }  
                else if (el.match(regexForHref)[1].slice(0,defaultLink.length) == defaultLink){
                  el = el.match(regexForHref)[1]
                    if (el[el.length - 1] == "/") el = el.slice(0, el.length - 1);
                    getPageUrls(el);  
                  }
              });
            })
          )
          .catch((err) => {return err});
      }
};

var streamToString = (stream, callback) => {
  var str = "";
  stream?.on("data",  (chunk) => {
    str += chunk;
  });
  stream?.on("end", () => {
    callback(str);
  });
};

getPageUrls();
