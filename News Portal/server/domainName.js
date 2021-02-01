const { lookup } = require("dns");
//dnsSearch is used to resolve web addresses to ips to be used with the IpApi
//Wrapped the native callback based function into a promise for easier handling using async/await
module.exports.dnsSearch = (hostname) => {
  return new Promise((resolve, reject) => {
    lookup(hostname, (err, addr) => {
      if (err) {
        reject(err);
      } else {
        resolve(addr);
      }
    });
  });
};
