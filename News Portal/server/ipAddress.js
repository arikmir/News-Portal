const { ipApiUrl, ipApiFields } = require("./settings");
const { parse } = require("url");
const { dnsLookUp, dnsSearch } = require("./domainName");
const axios = require("axios");

module.exports.getIPAddress = async (articles) => {
  const hostMaps = {};
  //Collect and sort articles based on source host
  for (const { title, publishedAt, url: jsonurl } of articles) {
    //Parsing the host url
    let hName = parse(jsonurl).hostname;
    if (hostMaps[hName]) {
      hostMaps[hName].push({
        url: jsonurl,
        title,
        hName,
        publishedAt,
      });
    } else {
      hostMaps[hName] = [
        {
          url: jsonurl,
          title,
          hName,
          publishedAt,
        },
      ];
    }
  }

  const ipMaps = {};

  //Get IPS by resolving hostnames
  for (const hostname of Object.keys(hostMaps)) {
    try {
      let ip = await dnsSearch(hostname);
      ipMaps[ip] = hostMaps[hostname];
    } catch (e) {
      console.error(e);
    }
  }

  //Calling the ip api with the collected data
  const { data: geoData } = await axios.post(ipApiUrl, Object.keys(ipMaps), {
    params: {
      fields: ipApiFields,
    },
  });

  const response = [];
  for (const { country, countryCode, lat, lon, query } of geoData) {
    if (ipMaps[query]) {
      ipMaps[query].forEach((ipMap) => {
        response.push({
          ...ipMap,
          country,
          countryCode,
          lat,
          lon,
          ip: query,
        });
      });
    }
  }
  return response;
};
